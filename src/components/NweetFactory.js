import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { dbService, storageService } from "fBase";
import { addDoc, collection } from "@firebase/firestore";
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
