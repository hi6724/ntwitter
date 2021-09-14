import { getAuth } from "@firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ProfileImage, StyledNweet } from "style/NweetStyle";

const Nweet = ({ nweetObj, isOwner, userObj }) => {
  const { register, getValues, handleSubmit } = useForm();
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    getPhoto();
  }, []);
  // creatorId 이용해서 User 리턴받고 PhotoUrl 얻기
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      nweetObj.attachmentUrl &&
        (await deleteObject(ref(storageService, nweetObj.attachmentUrl)));
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      //user 안에 있는 nweets array 에서 지우기
      const userQuery = await query(
        collection(dbService, "user"),
        where("uid", "==", userObj.uid)
      );
      const userSnapShot = await getDocs(userQuery);

      await updateDoc(doc(dbService, `user/${userSnapShot.docs[0].id}`), {
        nweets: userSnapShot.docs[0]
          .data()
          .nweets.filter((nweet) => nweet.createdAt !== nweetObj.createdAt),
      });
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async () => {
    updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: getValues("newNweet"),
    });

    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", userObj.uid)
    );
    const userSnapShot = await getDocs(userQuery);

    await updateDoc(doc(dbService, `user/${userSnapShot.docs[0].id}`), {
      nweets: userSnapShot.docs[0].data().nweets.map((nweet) => {
        if (nweet.createdAt === nweetObj.createdAt) {
          nweet.text = getValues("newNweet");
        }
        return nweet;
      }),
    });
    setEditing(false);
  };
  const getPhoto = async () => {
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", nweetObj.creatorId)
    );
    const userSnapShot = await getDocs(userQuery);
    const userPhotoURL = userSnapShot.docs[0].data().photoURL;
    const userDisplayName = userSnapShot.docs[0].data().displayName;
    setDisplayName(userDisplayName);
    setPhotoURL(userPhotoURL);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("newNweet", { value: nweetObj.text })}
              type="text"
              placeholder="Edit your nweet"
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <StyledNweet>
          <Link to={isOwner ? "/profile" : nweetObj.creatorId}>
            <ProfileImage src={photoURL} />
            <span>{displayName}</span>
          </Link>

          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </StyledNweet>
      )}
    </div>
  );
};
export default Nweet;
