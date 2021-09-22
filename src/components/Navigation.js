import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import { Nav } from "style/NavStyle";

const Navigation = ({ userObj, setPage }) => {
  const homeClick = () => {
    setPage(1);
  };
  return (
    <Nav>
      <Link to="/" onClick={homeClick}>
        <span>home</span>
        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />
      </Link>

      <Link to="/profile">
        <span>{userObj?.displayName}</span>
        <img
          src={
            userObj?.photoUrl
              ? userObj.photoUrl
              : "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
          }
        />
      </Link>
    </Nav>
  );
};
export default Navigation;
