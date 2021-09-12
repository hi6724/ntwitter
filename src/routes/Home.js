import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Nweet from "components/Nweet";
import NweetFacotry from "components/NweetFactory";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div``;
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(async () => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapShot) => {
      const nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <>
      <Container>
        <NweetFacotry userObj={userObj} />
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </Container>
    </>
  );
};
export default Home;
