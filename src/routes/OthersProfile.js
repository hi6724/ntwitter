import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import Nweet from "components/Nweet";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "style/HomeStyle";

export const OtherProfile = () => {
  const { uid } = useParams();
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const q = await query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", uid),
      limit(5)
    );
    onSnapshot(q, (snapShot) => {
      const nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
      console.log(nweets);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
  return (
    <Container>
      <div>{uid}의 프로필</div>
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={false} />
      ))}
    </Container>
  );
};
