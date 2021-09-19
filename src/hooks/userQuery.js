const { query, collection, where, getDocs } = require("@firebase/firestore");
const { dbService } = require("fBase");

export const getUserSnapShot = async (userObj) => {
  if (userObj) {
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", userObj.uid)
    );
    const userSnapShot = await (await getDocs(userQuery)).docs[0];
    return userSnapShot;
  }
};
export const getUser = async (uid) => {
  if (uid) {
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", uid)
    );
    const userSnapShot = await (await getDocs(userQuery)).docs[0];
    return userSnapShot.data();
  }
};
