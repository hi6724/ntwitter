import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { OtherProfile } from "routes/OthersProfile";
import Profile from "routes/Profile";
import styled from "styled-components";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Demo from "./Demo";
import Navigation from "./Navigation";
const Body = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  flex-direction: column;
`;

const AppRouter = ({ refreshUser, isLoggedIn, userObj, userSnapShot }) => {
  const [page, setPage] = useState(1);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Body>
            {isLoggedIn && <Navigation userObj={userObj} setPage={setPage} />}
            <Switch>
              <Route exact path="/">
                <Home
                  userObj={userObj}
                  page={page}
                  setPage={setPage}
                  userSnapShot={userSnapShot}
                  refreshUser={refreshUser}
                />
              </Route>
              <Route exact path="/profile">
                <Profile
                  userObj={userObj}
                  refreshUser={refreshUser}
                  userSnapShot={userSnapShot}
                />
              </Route>
              <Route exact path="/:uid">
                <OtherProfile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </Switch>
          </Body>
        ) : (
          <Body>
            <Route exact path="/">
              <Auth />
            </Route>
          </Body>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
