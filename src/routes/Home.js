import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Nweet from "components/Nweet";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
  const { register, handleSubmit, getValues, setValue } = useForm();
  const onSubmit = async () => {
    const { nweet, photo } = getValues();
    let attachmentUrl = null;
    if (photo[0]) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

      await uploadBytes(attachmentRef, photo[0]);
      attachmentUrl = await getDownloadURL(attachmentRef);
    }
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setAttachment(null);
    setValue("nweet", "");
    setValue("photo", "");
  };

  const onClearAttachment = () => setAttachment(null);
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
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
        <input
          {...register("photo")}
          onChange={onFileChange}
          type="file"
          accept="image/*"
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="150px" height="150px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
