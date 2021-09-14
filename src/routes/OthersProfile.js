import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import Nweet from "components/Nweet";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ButtonContainer, Container, ControlButton } from "style/HomeStyle";
import { OtherProfileDiv } from "style/OtherProfileStyle";

export const OtherProfile = () => {
  const [nweets, setNweets] = useState([]);
  const [page, setPage] = useState(1);
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { uid } = useParams();
  let nweetArray;
  const getPhoto = async () => {
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", uid)
    );
    const userSnapShot = await getDocs(userQuery);
    setPhotoURL(userSnapShot.docs[0].data().photoURL);
    setDisplayName(userSnapShot.docs[0].data().displayName);
  };

  const handleClick = (e) => {
    console.log(page);
    const {
      target: { id },
    } = e;
    if (id == "prev") {
      setPage((prev) => {
        if (prev <= 1) {
          return 1;
        } else {
          return (prev -= 1);
        }
      });
    } else {
      setPage((prev) => {
        if (nweets.length < 5) {
          return prev;
        } else {
          return (prev += 1);
        }
      });
    }
  };

  const getNweets = async (page) => {
    let q = await query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", uid),
      limit(5)
    );
    while (page > 1) {
      const documentSnapshots = await getDocs(q);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc"),
        where("creatorId", "==", uid),
        startAfter(lastVisible),
        limit(5)
      );
      page -= 1;
    }
    await onSnapshot(q, (snapShot) => {
      nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (nweetArray.length < 1) {
        setPage((prev) => (prev -= 1));
      }
      setNweets(nweetArray);
    });
  };
  useEffect(() => {
    getNweets(page);
    getPhoto();
  }, [page]);

  return (
    <Container>
      <OtherProfileDiv>
        <img src={photoURL} width="150px" />
        <span>{displayName}'s Profile</span>
      </OtherProfileDiv>
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={false} />
      ))}
      <ControlButton id="prev" onClick={handleClick}>
        ◀
      </ControlButton>
      <ControlButton id="next" onClick={handleClick}>
        ▶
      </ControlButton>
    </Container>
  );
};
