import React from "react";

const Auth = (props) => {
  return (
    <>
      <span>Auth</span>
      <button onClick={() => props.set(true)}>Login</button>
    </>
  );
};
export default Auth;
