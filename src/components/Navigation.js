import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  padding: 0px 20px 10px 20px;
  height: 70px;
  border-radius: 25px;
  /* background-color: cyan; */
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: space-between;
  width: 525px;
  align-items: center;
  img {
    border-radius: 50%;
    width: 50px;
  }

  a {
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  span {
    display: none;
  }
  a:hover {
    span {
      width: 130%;
      font-weight: 600;
      background-color: #9bd2c3;
      padding: 5px;
      top: 40px;
      border-radius: 5px;
      position: absolute;
      display: flex;
      justify-content: center;
    }
  }
`;

const Navigation = ({ userObj }) => (
  <Nav>
    <Link to="/">
      <span>home</span>
      <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
    </Link>

    <Link to="/profile">
      <span>
        {userObj?.displayName
          ? userObj.displayName
          : userObj.email.split("@")[0]}
      </span>
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
export default Navigation;
