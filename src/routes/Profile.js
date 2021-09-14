import { signOut, updateProfile } from "@firebase/auth";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Nweet from "components/Nweet";
import { authService, dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Container } from "style/HomeStyle";

const Profile = ({ refreshUser, userObj }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [tempPhoto, setTempPhoto] = useState(userObj.photoUrl);
  const [nweets, setNweets] = useState([]);
  setValue("newDisplayName", userObj.displayName);
  const history = useHistory();
  const onLogOutClick = async () => {
    await signOut(authService);
    history.push("/");
    window.location.reload();
  };
  const getMyNweets = async () => {
    const q = await query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", userObj.uid),
      limit(5)
    );
    onSnapshot(q, (snapShot) => {
      const nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  };
  const onSubmit = async () => {
    const { newDisplayName, profilePhoto } = getValues();
    let newProfileUrl = userObj.photoUrl;
    if (profilePhoto[0]) {
      const newProfileUrlRef = ref(storageService, `${userObj.uid}/profile`);
      await uploadBytes(newProfileUrlRef, profilePhoto[0]);
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
      // updateDoc(doc(dbService, `user`), {
      //   displayName: newDisplayName,
      //   photoURL: newProfileUrl,
      // });
      refreshUser();
    }
  };

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
      setTempPhoto(result);
    };
    reader.readAsDataURL(theFile);
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <Container>
      <img src={tempPhoto} width="150px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("newDisplayName")}
          type="text"
          placeholder="Display name"
        />
        <input
          {...register("profilePhoto")}
          onChange={onFileChange}
          type="file"
          accept="image/*"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
          userObj={userObj}
        />
      ))}
    </Container>
  );
};
export default Profile;
