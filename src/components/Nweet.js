import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { dbService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Nweet = ({ nweetObj, isOwner }) => {
  const { register, getValues, handleSubmit } = useForm();
  const [editing, setEditing] = useState(false);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async () => {
    console.log(getValues("newNweet"));
    updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: getValues("newNweet"),
    });
    setEditing(false);
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
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
