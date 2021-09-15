import styled from "styled-components";

export const ControlButton = styled.button`
  outline: none;
  height: 30px;
  text-align: center;
  width: min(30vw, 180px);
  border-radius: 12px;
  border: 1px solid #04aaff;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
  background-color: white;
  cursor: pointer;
  color: #1cb2ff;
  font-size: 15px;
  font-weight: 600;
  transition: color 0.2s;
  :hover {
    background-color: #1cb2ff;
    color: white;
  }
`;

export const Container = styled.div`
  position: relative;
  margin-top: 80px;
  width: min(90vw, 520px);
  padding: 22px 22px;
  border-radius: 15px;
  background-color: #a5c3dd;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 5px;
  bottom: -10px;
  display: flex;
  gap: 30px;
  justify-content: center;
`;
