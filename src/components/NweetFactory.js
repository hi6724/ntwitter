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
import Cropper from "react-cropper";
import {
  Button11,
  EditButtons,
  NweetName,
  StyledNweet,
  TextContainer,
} from "style/NweetStyle";
import Demo from "./Demo";
import { ImgInput } from "./ImgInput";

const NweetFacotry = ({ userObj, refreshUser }) => {
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [attachment, setAttachment] = useState(null);
  const [image, setImage] = useState(attachment);
  const [isCrop, setIsCrop] = useState(false);
  const { register, handleSubmit, getValues, setValue } = useForm();
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setAttachment(cropper.getCroppedCanvas().toDataURL());
      setIsCrop(false);
    }
  };
  const onSubmit = async () => {
    if (isCrop) {
      await getCropData();
    } else {
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
        likes: [],
        comments: [],
        createdAt: Date.now(),
        attachmentUrl,
        creatorId: userObj.uid,
        creatorName: userObj.displayName,
        photoURL: userObj.photoURL
          ? userObj.photoURL
          : "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg",
      };
      const nweetResult = await addDoc(
        collection(dbService, "nweets"),
        nweetObj
      );

      refreshUser();

      setAttachment(null);
      setValue("nweet", "");
    }
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
          <ImgInput
            setAttachment={setAttachment}
            setIsCrop={setIsCrop}
            setImage={setImage}
          />
        </label>
        <SubmitButton type="submit" value={isCrop ? "자르기" : "게시"} />
      </Form>
      {attachment && isCrop && (
        <StyledNweet>
          <div>
            <Cropper
              style={{ height: 400, width: "100%", zIndex: 1 }}
              zoomTo={0.1}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              dragMode={"move"}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              cropBoxResizable={false}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            <EditButtons>
              <Button11 onClick={getCropData}>Crop Image</Button11>
            </EditButtons>
          </div>
        </StyledNweet>
      )}
      {attachment && !isCrop && (
        <StyledNweet>
          <div>
            <TextContainer>
              <img src={attachment} />
            </TextContainer>
            <EditButtons>
              <Button11 onClick={() => setAttachment(null)}>Cancel</Button11>
              <Button11 onClick={() => setIsCrop(true)}>Resize Image</Button11>
            </EditButtons>
          </div>
        </StyledNweet>
      )}
    </>
  );
};

export default NweetFacotry;
