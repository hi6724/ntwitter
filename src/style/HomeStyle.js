import styled from "styled-components";

export const ControlButton = styled.button`
  outline: none;
  padding: 5px 12px;
  margin: 32px 15px 0 15px;
  border-radius: 12px;
  border: 4px solid #04aaff;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
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

export const Container = styled.div`
  margin-top: 0;
  width: 520px;
  height: 565px;
  padding: 32px 22px;
  border-radius: 15px;
  background-color: #a5c3dd;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 15px;
  bottom: -10px;
  display: flex;
  justify-content: center;
`;
