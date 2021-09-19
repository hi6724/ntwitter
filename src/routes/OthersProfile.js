import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import Nweet from "components/Nweet";
import { PageBtn } from "components/PageBtn";
import { dbService } from "fBase";
import { getNweets } from "hooks/getNweets";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ButtonContainer, Container, ControlButton } from "style/HomeStyle";
import { OtherProfileDiv } from "style/OtherProfileStyle";

export const OtherProfile = ({ refreshUser, userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [page, setPage] = useState(1);
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { uid } = useParams();
  let userSnapShot;
  let nweetArray;
  const getPhoto = async () => {
    const userQuery = await query(
      collection(dbService, "user"),
      where("uid", "==", uid)
    );
    userSnapShot = await getDocs(userQuery);
    setPhotoURL(userSnapShot.docs[0].data().photoURL);
    setDisplayName(userSnapShot.docs[0].data().displayName);
  };
  useEffect(() => {
    getPhoto();
  });
  useEffect(() => {
    getNweets(page, setPage, setNweets, uid);
  }, [page]);

  return (
    <Container>
      <OtherProfileDiv>
        <img src={photoURL} width="150px" />
        <span>{displayName}'s Profile</span>
      </OtherProfileDiv>
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={false}
          userObj={userObj}
        />
      ))}
      <PageBtn nweets={nweets} setPage={setPage} />
    </Container>
  );
};
