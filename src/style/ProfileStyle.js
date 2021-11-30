import styled from "styled-components";
import { Button31 } from "./AuthStyle";
import { Button11, Button48 } from "./NweetStyle";

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
    height: 50px;
    width: 100%;
    font-size: 23px;
    font-weight: 600;
    background-color: inherit;
  }
  form {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
  }
`;
export const UpdateButton = styled.button`
  box-sizing: border-box;
  margin-bottom: 15px;
  padding: 6px;
  cursor: pointer;
  border: none;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: white;
  border-radius: 8px;
  transition: all 0.2s;
  color: #03a9f4;
  :hover {
    color: white;
    background-color: #03a9f4;
  }
`;
export const PLabel = styled.label`
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 6px;
  text-align: center;
  cursor: pointer;
  border: none;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: white;
  border-radius: 8px;
  transition: all 0.2s;
  color: #03a9f4;
  :hover {
    color: white;
    background-color: #03a9f4;
  }
`;

export const LogoutButton = styled(Button48)`
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
  margin-top: 5px;
  display: block;
  position: relative;
  background-image: ${(props) => {
    return `url(${props.img})`;
  }};
  background-size: 150px 150px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  cursor: pointer;
  button {
    position: absolute;
    top: -30px;
    left: -15px;
    white-space: nowrap;
  }
`;
