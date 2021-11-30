import Nweet from "components/Nweet";
import NweetFacotry from "components/NweetFactory";
import { PageBtn } from "components/PageBtn";
import { getNweets } from "hooks/getNweets";
import React, { useEffect, useState } from "react";
import { Container } from "style/HomeStyle";

const Home = ({ userObj, page, setPage, userSnapShot, refreshUser }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    getNweets(page, setPage, setNweets);
  }, [page]);

  return (
    <>
      <Container>
        <NweetFacotry
          userObj={userObj}
          userSnapShot={userSnapShot}
          refreshUser={refreshUser}
        />
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            userObj={userObj}
            userSnapShot={userSnapShot}
            refreshUser={refreshUser}
          />
        ))}
        <PageBtn nweets={nweets} setPage={setPage} />
      </Container>
    </>
  );
};
export default Home;
