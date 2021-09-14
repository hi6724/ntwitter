import styled from "styled-components";
import { Button31 } from "./AuthStyle";
import { Button11 } from "./NweetStyle";

export const ProfileLayout = styled.div`
  input[type="file"] {
    width: 0px;
  }
  display: flex;
  flex-direction: column;
  input[type="text"] {
    outline: none;
    border: none;
    border-radius: 15px;
    margin-right: 15px;
    height: 50px;
    width: 100%;
    font-size: 17px;
    font-weight: 600;
  }
  form {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
`;
export const UpdateButton = styled(Button11)``;

export const LogoutButton = styled(Button31)`
  cursor: pointer;
  position: absolute;
  right: 15px;
  width: 100px;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  right: 15px;
`;

export const Label = styled.label`
  display: block;
  position: relative;
  background-image: ${(props) => {
    return `url(${props.img})`;
  }};
  background-size: 100px 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
`;
