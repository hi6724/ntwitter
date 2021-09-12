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
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = async () => {
    const user = await authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoUrl: user.photoURL,
    });
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
