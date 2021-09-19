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
import {
  ProfileDisplayName,
  ProfileImage,
  ProfileImageContainer,
  StyledNweet,
  TextContainer,
  NweetText,
  NweetName,
  EditButtons,
  ShowButton,
  EditButton,
  Editing,
  Contents,
  Comments,
} from "style/NweetStyle";
import { Comment, CommentFactory } from "./Comment";

const Nweet = ({ nweetObj, isOwner, userObj, userSnapShot }) => {
  const { register, getValues, handleSubmit } = useForm();
  const [comments, setComments] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);
  const [isLike, setIsLike] = useState(nweetObj.likes.includes(userObj.uid));
  useEffect(() => {
    nweetObj.comments.map(async (comment) => {
      const userQuery = await query(
        collection(dbService, "user"),
        where("uid", "==", comment.uid)
      );
      const userSnapShot = await getDocs(userQuery);
      const commentObj = {
        id: comment.id,
        uid: comment.uid,
        data: userSnapShot.docs[0].data(),
        text: comment.text,
      };
      setComments((prev) => [commentObj, ...prev]);
    });

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
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async () => {
    updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: getValues("newNweet"),
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
  const onShowClick = () => {
    setShowEdit((prev) => {
      if (prev) {
        setEditing(false);
      }
      return !prev;
    });
  };
  const clickLike = async () => {
    if (isLike) {
      updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
        likes: nweetObj.likes.filter((like) => like !== userObj.uid),
      });
    } else {
      updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
        likes: [userObj.uid, ...nweetObj.likes],
      });
    }
    setIsLike((prev) => !prev);
  };
  return (
    <div>
      <StyledNweet>
        <Contents>
          <Link to={isOwner ? "/profile" : nweetObj.creatorId}>
            <ProfileImage src={photoURL} />
          </Link>
          <div>
            <TextContainer>
              <NweetName>{displayName}</NweetName>
              <NweetName onClick={clickLike}>
                <span>
                  {isLike ? "🧡" : "🤍"}
                  {nweetObj.likes ? nweetObj.likes.length : 0}
                </span>
              </NweetName>
              {editing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    id="editNweet"
                    {...register("newNweet", { value: nweetObj.text })}
                    type="text"
                    placeholder="Edit your nweet"
                  />
                </form>
              ) : (
                <NweetText>{nweetObj.text}</NweetText>
              )}
              {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            </TextContainer>
            {isOwner ? (
              <EditButtons showEdit={showEdit}>
                <ShowButton onClick={onShowClick} showEdit={showEdit}>
                  {showEdit ? "Cancel" : "Edit"}
                </ShowButton>
                <EditButton showEdit={showEdit} onClick={onDeleteClick}>
                  Delete Nweet
                </EditButton>
                <EditButton showEdit={showEdit} onClick={toggleEditing}>
                  Edit Nweet
                </EditButton>
                <EditButton
                  showEdit={showEdit}
                  onClick={handleSubmit(onSubmit)}
                >
                  Update Nweet
                </EditButton>
              </EditButtons>
            ) : (
              <EditButtons>
                <ShowButton>Show</ShowButton>
              </EditButtons>
            )}
          </div>
        </Contents>

        {/* <Comments>
          <CommentFactory userObj={userObj} nweetObj={nweetObj} />
          {comments.map((comment) => (
            <Comment
              key={comment.createdAt}
              userObj={userObj}
              commentObj={comment}
              nweetObj={nweetObj}
            />
          ))}
        </Comments> */}
      </StyledNweet>
    </div>
  );
};
export default Nweet;
