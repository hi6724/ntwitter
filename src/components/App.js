import { onAuthStateChanged } from "@firebase/auth";
import { authService } from "fBase";
import { useEffect, useState } from "react";
import AppRouter from "./Router";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : <span>Loading...</span>}
      <footer>&copy;{new Date().getFullYear()}Ntwitter</footer>
    </>
  );
}

export default App;
