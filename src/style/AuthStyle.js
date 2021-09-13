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
export const Login = styled.span`
  cursor: pointer;
  text-align: center;
  background-color: black;
  color: white;
  border-radius: 15px;
  padding: 5px 5px;
`;
