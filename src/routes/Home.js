import Nweet from "components/Nweet";
import NweetFacotry from "components/NweetFactory";
import { PageBtn } from "components/PageBtn";
import { getNweets } from "hooks/getNweets";
import React, { useEffect, useState } from "react";
import { Container } from "style/HomeStyle";

const Home = ({ userObj, page, setPage, userSnapShot }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(async () => {
    getNweets(page, setPage, setNweets);
  }, [page]);

  return (
    <>
      <Container>
        <NweetFacotry userObj={userObj} userSnapShot={userSnapShot} />
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            userObj={userObj}
            userSnapShot={userSnapShot}
          />
        ))}
        <PageBtn nweets={nweets} setPage={setPage} />
      </Container>
    </>
  );
};
export default Home;
