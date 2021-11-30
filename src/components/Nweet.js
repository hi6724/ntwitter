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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  faArrowAltCircleDown,
  faComments as faComments,
} from "@fortawesome/free-regular-svg-icons";
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
  Span,
} from "style/NweetStyle";
import { Comment, CommentFactory } from "./Comment";
import { faWeight } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner, userObj, userSnapShot }) => {
  const { register, getValues, handleSubmit } = useForm();
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(true);
  const [commentPage, setCommentPage] = useState(1);
  const [photoURL, setPhotoURL] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);
  const [isLike, setIsLike] = useState(nweetObj.likes.includes(userObj.uid));
  useEffect(() => {
    // nweetObj.comments.map(async (comment, index) => {
    //   if (index < 3 && index >= 0) {
    //     const userQuery = await query(
    //       collection(dbService, "user"),
    //       where("uid", "==", comment.uid)
    //     );
    //     const userSnapShot = await getDocs(userQuery);
    //     const commentObj = {
    //       id: comment.id,
    //       uid: comment.uid,
    //       data: userSnapShot.docs[0].data(),
    //       text: comment.text,
    //     };
    //     setComments((prev) => [commentObj, ...prev]);
    //   }
    // });

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
  const toggleComments = () => {
    setComments([]);
    setShowComment((prev) => {
      if (prev === true) {
        setCommentPage((prev) => (prev += 1));
      } else {
        setCommentPage(1);
      }
      return !prev;
    });
    if (showComment) {
      nweetObj.comments.map(async (comment, index) => {
        if (index < commentPage * 3) {
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
        }
      });
    }
  };
  const moreComments = async () => {
    setCommentPage((prev) => (prev += 1));
    nweetObj.comments.map(async (comment, index) => {
      if (index >= (commentPage - 1) * 3 && index < commentPage * 3) {
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
      }
    });
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
                  {showEdit ? <Span>Cancel</Span> : <Span>Edit</Span>}
                </ShowButton>
                <EditButton showEdit={showEdit} onClick={onDeleteClick}>
                  <Span>Delete Nweet</Span>
                </EditButton>
                <EditButton showEdit={showEdit} onClick={toggleEditing}>
                  <Span>Edit Nweet</Span>
                </EditButton>
                <EditButton
                  showEdit={showEdit}
                  onClick={handleSubmit(onSubmit)}
                >
                  <Span>Update Nweet</Span>
                </EditButton>
              </EditButtons>
            ) : (
              <EditButtons></EditButtons>
            )}
          </div>
        </Contents>

        <Comments>
          <div className="controller">
            <span style={{ cursor: "pointer" }} onClick={clickLike}>
              {isLike ? "🧡" : "🤍"}
            </span>
            <span>
              <FontAwesomeIcon
                onClick={toggleComments}
                style={{ cursor: "pointer" }}
                icon={faComments}
                size="lg"
              />
            </span>
          </div>
          <div style={{ fontWeight: "bold" }}>
            {" "}
            좋아요 {nweetObj.likes.length}개
          </div>
          <div style={{ opacity: "0.7" }}>
            댓글 {nweetObj.comments.length}개{" "}
            <span style={{ cursor: "pointer" }} onClick={toggleComments}>
              {!showComment ? "닫기" : "모두 보기"}
            </span>
          </div>
          {!showComment && (
            <div className="commentFactory">
              <CommentFactory
                userObj={userObj}
                nweetObj={nweetObj}
                setComments={setComments}
                comments={comments}
              />
            </div>
          )}
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              userObj={userObj}
              commentObj={comment}
              nweetObj={nweetObj}
              setComments={setComments}
              comments={comments}
              className="comment"
            />
          ))}

          {!showComment && (
            <div className="more">
              <button onClick={moreComments} className="moreComments">
                <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />
                <span>더보기</span>
              </button>
            </div>
          )}
        </Comments>
      </StyledNweet>
    </div>
  );
};
export default Nweet;
