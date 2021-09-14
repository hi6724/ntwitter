import styled from "styled-components";

export const ControlButton = styled.button`
  position: fixed;
  top: 48vh;
  right: 50vw;
  transform: ${(props) => {
    if (props.id == "prev") {
      return "translateX(-280px)";
    } else {
      return "translateX(368px)";
    }
  }};
  outline: none;
  padding: 5px 12px;
  margin: 32px 15px 0 15px;
  border-radius: 12px;
  border: 1px solid #04aaff;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
  background-color: white;
  cursor: pointer;
  color: #1cb2ff;
  font-size: 15px;
  font-weight: 600;
  height: 150px;
  transition: color 0.2s;
  :hover {
    background-color: #1cb2ff;
    color: white;
  }
`;

export const Container = styled.div`
  position: relative;
  margin-top: 80px;
  width: 520px;
  padding: 22px 22px;
  border-radius: 15px;
  background-color: #a5c3dd;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 15px;
  bottom: -10px;
  display: flex;
  justify-content: center;
`;
