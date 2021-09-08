import { authService } from "fBase";
import { useState } from "react";
import AppRouter from "./Router";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy;{new Date().getFullYear()}Ntwitter</footer>
    </>
  );
}

export default App;
