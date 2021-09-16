import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "@firebase/storage";
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
import { Attachment, Form, TextArea } from "style/NweetFactoryStyle";
import { AuthInput, SubmitButton } from "style/AuthStyle";
import {
  Button11,
  EditButtons,
  NweetName,
  StyledNweet,
  TextContainer,
} from "style/NweetStyle";
import Demo from "./Demo";
import { ImgInput } from "./ImgInput";

const NweetFacotry = ({ userObj, userSnapShot }) => {
  const [attachment, setAttachment] = useState(null);
  const [isCrop, setIsCrop] = useState(false);
  const { register, handleSubmit, getValues, setValue } = useForm();
  const onSubmit = async () => {
    const { nweet } = getValues();
    if (attachment === null && !nweet) {
      alert("Input Nweet or Photo please");
      return;
    }
    let attachmentUrl = null;
    if (attachment !== null) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
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
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          {...register("nweet")}
          type="text"
          placeholder="What's on your mind?"
          maxLength={80}
        ></AuthInput>
        <label htmlFor="file-upload" className="custom-file-upload">
          <FontAwesomeIcon icon={faImage} size="lg" />
          <ImgInput setAttachment={setAttachment} setIsCrop={setIsCrop} />
        </label>
        <SubmitButton type="submit" value="Nweet" />
      </Form>
      {attachment && isCrop && (
        <Demo
          attachment={attachment}
          setAttachment={setAttachment}
          setIsCrop={setIsCrop}
        />
      )}
      {attachment && !isCrop && (
        <StyledNweet>
          <div>
            <TextContainer>
              <img src={attachment} />
            </TextContainer>
            <EditButtons>
              <Button11 onClick={setAttachment(null)}>Cancel</Button11>
              <Button11 onClick={() => setIsCrop(true)}>Crop Size</Button11>
            </EditButtons>
          </div>
        </StyledNweet>
      )}
    </>
  );
};

export default NweetFacotry;
