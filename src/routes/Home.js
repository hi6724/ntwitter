import { signOut } from "@firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import Nweet from "components/Nweet";
import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(async () => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapShot) => {
      const nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = async () => {
    const { nweet } = getValues();
    setValue("nweet", "");
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("nweet")}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};
export default Home;
