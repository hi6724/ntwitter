import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export const AuthInput = styled.input`
  outline: none;
  padding: 12px 5px;
  margin: 12px 0px;
  border-radius: 12px;
  border: 2px solid white;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
`;
export const SubmitButton = styled(AuthInput)`
  background-color: white;
  cursor: pointer;
  color: #1cb2ff;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;
  :hover {
    background-color: #1cb2ff;
    color: white;
  }
`;

/* CSS */
export const Button31 = styled.button`
  background-color: tomato;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  :hover {
    opacity: 0.75;
  }
`;
