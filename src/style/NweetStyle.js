import styled from "styled-components";

export const StyledNweet = styled.div`
  background-color: white;
  position: relative;
  outline: none;
  padding: 12px 5px;
  margin: 12px 0px;
  border-radius: 12px;
  border: 2px solid white;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
  transition: all 0.5s;
`;
export const Contents = styled.div`
  display: flex;
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
export const Comments = styled.div`
  border-top: 2px solid black;
`;

export const Button11 = styled.button`
  appearance: button;

  background-color: ${(props) => {
    if (props.children === "Cancel") {
      return "#D54D52";
    } else {
      return "#1899d6";
    }
  }};

  border: solid transparent;
  border-radius: min(16px, 3vw);
  border-width: 0 0 min(4px, 0.8vw);
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: min(12px, 2vw);
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: min(20px, 4vw);
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 3px min(16px, 3vw);
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  /* width: 100%; */
  :after {
    background-clip: padding-box;
    background-color: ${(props) => {
      if (props.children === "Cancel") {
        return "#D54D52";
      } else {
        return "#1cb0f6";
      }
    }};
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
  :main,
  :focus {
    user-select: auto;
  }
  :hover:not(:disabled) {
    filter: brightness(1.1);
  }
  :disabled {
    cursor: auto;
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  border-radius: 50%;
`;
export const ShowButton = styled(Button11)``;
export const EditButton = styled(Button11)`
  display: ${(props) => (props.showEdit ? "block" : "none")};
`;
export const EditButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* transform: translateX(370px); */
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin-top: 15px;
    width: 100%;
    border-radius: 15px;
    max-height: 500px;
  }
  input[type="text"] {
    font-size: 16px;
    margin-left: 12px;
  }
`;
export const NweetName = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-left: 12px;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  .like {
    color: tomato;
  }
`;
export const NweetText = styled.span`
  margin-left: 12px;
`;
