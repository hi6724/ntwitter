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
  margin-top: 15px;
  border-top: 2px solid rgba(0, 0, 0, 0.8);

  .controller {
    margin-top: 5px;
    display: flex;
    gap: 5px;
    span {
      font-size: min(5vw, 25px);
    }
  }
  .commentFactory {
    input {
      outline: none;
      border-radius: 15px;
      width: min(300px, 50vw);
      height: 50px;
      border: none;
      box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
      margin: 15px 0px;
    }
    input[type="submit"] {
      cursor: pointer;
      color: rgb(4, 170, 255);
      background: none;
      box-shadow: none;
      font-size: 16px;
      font-weight: 600;
      margin-left: 6px;
      height: 50px;
      width: 50px;
    }
  }

  .moreComments {
    cursor: pointer;
    border: none;
    width: min(300px, 50vw);
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
  }
`;
export const Span = styled.span``;

export const Button48 = styled.button`
  appearance: none;
  background-color: #f0f8ff;
  border-width: 0;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: inline-block;
  font-family: Clarkson, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1em;
  margin: 0;
  opacity: 1;
  outline: 0;
  padding: 10px 15px;

  position: relative;
  text-align: center;
  text-decoration: none;
  text-rendering: geometricprecision;
  text-transform: uppercase;
  transition: opacity 300ms cubic-bezier(0.694, 0, 0.335, 1),
    background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
    color 100ms cubic-bezier(0.694, 0, 0.335, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;

  :before {
    animation: opacityFallbackOut 0.5s step-end forwards;
    backface-visibility: hidden;
    background-color: ${(props) => {
      if (
        props.children.props.children === "Cancel" ||
        props.children.props.children === "Logout"
      ) {
        return "tomato";
      } else {
        return "#1cb0f6";
      }
    }};
    clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateZ(0);
    transition: clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
      -webkit-clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    width: 100%;
  }

  :hover:before {
    animation: opacityFallbackIn 0s step-start forwards;
    clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
  }

  :after {
    background-color: #ffffff;
  }
  :hover {
    ${Span} {
      color: #f0f8ff;
    }
  }

  span {
    color: ${(props) => {
      if (
        props.children.props.children === "Cancel" ||
        props.children.props.children === "Logout"
      ) {
        return "tomato";
      } else {
        return "#1cb0f6";
      }
    }};
    z-index: 1;
    position: relative;
  }
`;

export const Button11 = styled.button`
  appearance: button;

  background-color: ${(props) => {
    if (props.children === "Cancel") {
      return "#D54D52";
    } else {
      return "#1cb0f6";
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
export const ShowButton = styled(Button48)``;
export const EditButton = styled(Button48)`
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
    width: min(400px, 58vw);
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
`;
export const NweetText = styled.span`
  margin-left: 12px;
  font-size: 22px;
`;
