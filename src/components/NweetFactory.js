import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { dbService, storageService } from "fBase";
import { addDoc, collection } from "@firebase/firestore";

const NweetFacotry = ({ userObj }) => {
  const [attachment, setAttachment] = useState("");
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
  );
};

export default NweetFacotry;
