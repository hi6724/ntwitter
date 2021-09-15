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
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Nweet from "components/Nweet";
import { authService, dbService, storageService } from "fBase";
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

const Profile = ({ refreshUser, userObj }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  setValue("newDisplayName", userObj.displayName);
  const [page, setPage] = useState(1);
  console.log(userObj, page);
  const [tempPhoto, setTempPhoto] = useState(userObj.photoUrl);
  const [nweets, setNweets] = useState([]);
  let nweetArray;

  const history = useHistory();
  const onLogOutClick = async () => {
    await signOut(authService);
    history.push("/");
    window.location.reload();
  };
  const getMyNweets = async (page) => {
    if (page < 1) {
      return;
    }
    let q = await query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", userObj.uid),
      limit(5)
    );
    while (page > 1) {
      const documentSnapshots = await getDocs(q);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc"),
        where("creatorId", "==", userObj.uid),
        startAfter(lastVisible),
        limit(5)
      );
      page -= 1;
    }
    await onSnapshot(q, (snapShot) => {
      nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (nweetArray.length < 1) {
        setPage((prev) => (prev -= 1));
      }
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
      const userQuery = await query(
        collection(dbService, "user"),
        where("uid", "==", userObj.uid)
      );
      const userSnapShot = await getDocs(userQuery);
      await updateDoc(doc(dbService, `user/${userSnapShot.docs[0].id}`), {
        displayName: newDisplayName,
        photoURL: newProfileUrl,
      });
      refreshUser();
    }
  };
  const handleClick = (e) => {
    console.log(nweets.length);
    const {
      target: { id },
    } = e;
    if (id == "prev") {
      setPage((prev) => {
        if (prev <= 1) {
          return 1;
        } else {
          return (prev -= 1);
        }
      });
    } else {
      setPage((prev) => {
        if (nweets.length < 5) {
          return prev;
        } else {
          return (prev += 1);
        }
      });
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
    getMyNweets(page);
  }, [page]);

  return (
    <Container>
      <ProfileLayout>
        <Label htmlFor="profilePhoto" img={tempPhoto}></Label>

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
      <ButtonContainer>
        <ControlButton id="prev" onClick={handleClick}>
          ◀
        </ControlButton>
        <ControlButton id="next" onClick={handleClick}>
          ▶
        </ControlButton>
      </ButtonContainer>
    </Container>
  );
};
export default Profile;
