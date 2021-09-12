import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Profile from "routes/Profile";
import styled from "styled-components";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Color from "./Color";
import Navigation from "./Navigation";
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aliceblue;
`;
const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <Body>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
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
