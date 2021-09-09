import { signOut } from "@firebase/auth";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = (props) => {
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(async () => {
    getNweets();
  }, []);
  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = async () => {
    const { nweet } = getValues();
    setValue("nweet", "");
    await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: Date.now(),
    });
  };
  console.log(nweets);
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
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
        </div>
      ))}
    </div>
  );
};
export default Home;
