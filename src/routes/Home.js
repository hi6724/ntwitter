import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "@firebase/firestore";
import Nweet from "components/Nweet";
import NweetFacotry from "components/NweetFactory";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { ButtonContainer, Container, ControlButton } from "style/HomeStyle";
import styled from "styled-components";

const Home = ({ userObj }) => {
  const [page, setPage] = useState(1);
  const [nweets, setNweets] = useState([]);
  useEffect(async () => {
    getNweets(page);
  }, [page]);
  const getNweets = async (page) => {
    let q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    while (page > 1) {
      const documentSnapshots = await getDocs(q);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(5)
      );
      page -= 1;
    }
    await onSnapshot(q, (snapShot) => {
      const nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (nweetArray.length < 1) {
        setPage((prev) => (prev -= 1));
      }
      setNweets(nweetArray);
    });
  };
  const handleClick = (e) => {
    const {
      target: { id },
    } = e;
    if (id == "prev") {
      setPage((prev) => {
        if (prev == 1) {
          return 1;
        } else {
          return (prev -= 1);
        }
      });
    } else {
      setPage((prev) => {
        return (prev += 1);
      });
    }
    console.log(page);
  };
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
        <ButtonContainer>
          <ControlButton id="prev" onClick={handleClick}>
            ◀
          </ControlButton>
          <ControlButton id="next" onClick={handleClick}>
            ▶
          </ControlButton>
        </ButtonContainer>
      </Container>
    </>
  );
};
export default Home;
