const {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  startAfter,
  onSnapshot,
  where,
} = require("@firebase/firestore");
const { dbService } = require("fBase");

export const getNweets = async (page, setPage, setNweets, uid) => {
  if (page < 1) {
    return;
  }
  let q;
  if (uid) {
    q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", uid),
      limit(5)
    );
  } else {
    q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
  }
  while (page > 1) {
    const documentSnapshots = await getDocs(q);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    if (uid) {
      q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc"),
        where("creatorId", "==", uid),
        startAfter(lastVisible),
        limit(5)
      );
    } else {
      q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(5)
      );
    }
    page -= 1;
  }
  await onSnapshot(q, (snapShot) => {
    const nweetArray = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (nweetArray.length < 1) {
      setPage((prev) => (prev -= 1));
    }
    setNweets(nweetArray);
  });
};
