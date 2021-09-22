import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { dbService } from "fBase";
import { getUser } from "hooks/userQuery";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export const Comment = ({
  userObj,
  commentObj,
  nweetObj,
  setComments,
  comments,
}) => {
  const deleteComment = async () => {
    const newComments = nweetObj.comments.filter(
      (comment) => comment.id !== commentObj.id
    );
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      comments: newComments,
    });
    setComments(comments.filter((comment) => comment.id !== commentObj.id));
  };

  return (
    <div>
      <Link
        to={
          commentObj.data.uid === userObj.uid ? "/profile" : commentObj.data.uid
        }
      >
        <img src={commentObj.data.photoURL} width="50px" />
        <span>{commentObj.data.displayName}</span>
      </Link>
      <div>
        <div>{commentObj.text}</div>
      </div>
      {commentObj.data.uid === userObj.uid && (
        <>
          <button onClick={deleteComment}>Delete</button>
        </>
      )}
    </div>
  );
};

export const CommentFactory = ({
  userObj,
  nweetObj,
  setComments,
  comments,
}) => {
  const { getValues, register, handleSubmit } = useForm();
  const onSubmit = async () => {
    const text = getValues("text");
    const commentObj = {
      id: uuidv4(),
      uid: userObj.uid,
      createdAt: Date.now(),
      text,
    };
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", commentObj.uid)
    );
    const userSnapShot = await getDocs(userQuery);
    const temp = {
      id: uuidv4(),
      uid: userObj.uid,
      createdAt: Date.now(),
      data: userSnapShot.docs[0].data(),
      text,
    };
    const newComments = [commentObj, ...nweetObj.comments];
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      comments: newComments,
    });
    setComments([temp, ...comments]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("text")} />
        <input type="submit" value="게시" />
      </form>
    </>
  );
};
