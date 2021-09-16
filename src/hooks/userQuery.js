const { query, collection, where, getDocs } = require("@firebase/firestore");
const { dbService } = require("fBase");

export const getUserSnapShot = async (userObj) => {
  if (userObj) {
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", userObj.uid)
    );
    const userSnapShot = await getDocs(userQuery);
    return userSnapShot;
  }
};
