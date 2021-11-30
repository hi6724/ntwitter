import { onAuthStateChanged } from "@firebase/auth";
import { authService } from "fBase";
import { getUserSnapShot } from "hooks/userQuery";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import AppRouter from "./Router";

const GlobalStyles = createGlobalStyle`

  *{
    /* font-family:"jua" */
    font-family:"jua","Spoqa Han Sans Neo", "Spoqa Han Sans JP", sans-serif;
  }
  html{
    scroll-behavior: smooth;
  }
  body{
    background-color: #F0F8FF;
  }
    a {
      text-decoration: none;
      color:inherit;
    }
`;

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userSnapShot, setUserSnapShot] = useState();
  useEffect(() => {
    setUserSnapShot(getUserSnapShot(userObj));
  }, [userObj]);

  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          photoUrl: user.photoURL
            ? user.photoURL
            : "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg",
          displayName: user.displayName
            ? user.displayName
            : user.email.split("@")[0],
        });
        setIsLoggedIn(true);
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = async () => {
    const user = await authService.currentUser;
    if (user) {
      setUserObj({
        uid: user.uid,
        photoUrl: user.photoURL
          ? user.photoURL
          : "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg",
        displayName: user.displayName
          ? user.displayName
          : user.email.split("@")[0],
      });
    } else {
      setUserObj(null);
    }
    setUserSnapShot(await getUserSnapShot(userObj));
  };
  return (
    <>
      <GlobalStyles />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObj={userObj}
          isLoggedIn={isLoggedIn}
          userSnapShot={userSnapShot}
        />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default App;
