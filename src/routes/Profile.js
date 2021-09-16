import { signOut, updateProfile } from "@firebase/auth";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import Demo from "components/Demo";
import Nweet from "components/Nweet";
import { PageBtn } from "components/PageBtn";
import { authService, dbService, storageService } from "fBase";
import { getNweets } from "hooks/getNweets";
import { getUserSnapShot } from "hooks/userQuery";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { ButtonContainer, Container, ControlButton } from "style/HomeStyle";
import { Button11 } from "style/NweetStyle";
import {
  Label,
  LogoutButton,
  ProfileLayout,
  UpdateButton,
} from "style/ProfileStyle";

const Profile = ({ refreshUser, userObj, userSnapShot }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  setValue("newDisplayName", userObj.displayName);
  const [page, setPage] = useState(1);
  const [attachment, setAttachment] = useState("");
  const [isCrop, setIsCrop] = useState(false);
  const [nweets, setNweets] = useState([]);
  let nweetArray;

  useEffect(() => {
    getNweets(page, setPage, setNweets, userObj.uid);
    // getMyNweets(page);
  }, [page]);

  const history = useHistory();
  const onLogOutClick = async () => {
    await signOut(authService);
    history.push("/");
    window.location.reload();
  };

  const onSubmit = async () => {
    const { newDisplayName } = getValues();

    let newProfileUrl = null;
    if (attachment !== "") {
      const newProfileUrlRef = ref(storageService, `${userObj.uid}/profile`);
      await uploadString(newProfileUrlRef, attachment, "data_url");
      newProfileUrl = await getDownloadURL(newProfileUrlRef);
    }
    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoUrl !== newProfileUrl
    ) {
      await updateProfile(await authService.currentUser, {
        displayName: newDisplayName,
        photoURL: newProfileUrl,
      });

      // const userSnapShot = await getUserSnapShot(userObj);
      await updateDoc(doc(dbService, `user/${userSnapShot.docs[0].id}`), {
        displayName: newDisplayName,
        photoURL: newProfileUrl,
      });
      refreshUser();
    }
  };

  const onFileChange = (event) => {
    setIsCrop(true);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const maxSize = 5 * 1024 * 1024;
    if (theFile.size > maxSize) {
      alert("프로필 사이즈는 5MB 이내로 등록 가능합니다.");
      onClearAttachment();
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <>
      <Container>
        <ProfileLayout>
          <Label
            htmlFor="profilePhoto"
            img={attachment ? attachment : userObj.photoUrl}
          >
            <Button11>Change Photo</Button11>
          </Label>
          {isCrop && attachment && (
            <Demo
              attachment={attachment}
              setAttachment={setAttachment}
              setIsCrop={setIsCrop}
            />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("newDisplayName")}
              maxLength="6"
              type="text"
              placeholder="Display name"
            />
            <input
              {...register("profilePhoto")}
              onChange={onFileChange}
              id="profilePhoto"
              type="file"
              accept="image/*"
            />
            <UpdateButton onClick={handleSubmit(onSubmit)}>Update</UpdateButton>
          </form>
          <LogoutButton onClick={onLogOutClick}>Log Out</LogoutButton>
        </ProfileLayout>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            userObj={userObj}
          />
        ))}
        <PageBtn nweets={nweets} setPage={setPage} />
      </Container>
    </>
  );
};
export default Profile;
