import { doc, updateDoc } from "@firebase/firestore";
import { dbService } from "fBase";
import { getUser } from "hooks/userQuery";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export const Comment = ({ userObj, commentObj, nweetObj }) => {
  const deleteComment = async () => {
    console.log(nweetObj.comments);
    console.log(commentObj.id);
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
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export const CommentFactory = ({ userObj, nweetObj }) => {
  const { getValues, register, handleSubmit } = useForm();
  const onSubmit = async () => {
    const text = getValues("text");
    const commentObj = {
      id: uuidv4(),
      uid: userObj.uid,
      createdAt: Date.now(),
      text,
    };
    const result = await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      comments: [commentObj, ...nweetObj.comments],
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("text")} />
        <input type="submit" value="submit" />
      </form>
    </>
  );
};
