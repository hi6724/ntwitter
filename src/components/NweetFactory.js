import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { dbService, storageService } from "fBase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Form, TextArea } from "style/NweetFactoryStyle";
import { AuthInput, SubmitButton } from "style/AuthStyle";

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
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      attachmentUrl,
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      photoURL: userObj.photoURL
        ? userObj.photoURL
        : "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg",
    };
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", userObj.uid)
    );
    const userSnapShot = await getDocs(userQuery);

    await addDoc(collection(dbService, "nweets"), nweetObj);
    await updateDoc(doc(dbService, `user/${userSnapShot.docs[0].id}`), {
      nweets: [
        {
          text: nweetObj.text,
          createdAt: nweetObj.createdAt,
          attachmentUrl: nweetObj.attachmentUrl,
        },
        ...userSnapShot.docs[0].data().nweets,
      ],
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        {...register("nweet")}
        type="text"
        placeholder="What's on your mind?"
        maxLength={80}
      ></AuthInput>
      <label htmlFor="file-upload" className="custom-file-upload">
        <FontAwesomeIcon icon={faImage} size="lg" />
        <input
          id="file-upload"
          {...register("photo")}
          onChange={onFileChange}
          type="file"
          accept="image/*"
        />
      </label>
      <SubmitButton type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="150px" height="150px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </Form>
  );
};

export default NweetFacotry;
