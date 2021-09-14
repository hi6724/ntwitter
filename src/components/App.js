import { onAuthStateChanged } from "@firebase/auth";
import { authService } from "fBase";
import { useEffect, useState } from "react";
import AppRouter from "./Router";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
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
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObj={userObj}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

export default App;
