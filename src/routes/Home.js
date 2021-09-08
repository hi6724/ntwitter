import React from "react";

const Home = (props) => {
  return (
    <>
      <span>Home</span>
      <button onClick={() => props.set(false)}>Logout</button>
    </>
  );
};
export default Home;
