import styled from "styled-components";
export const Form = styled.form`
  position: relative;
  width: min(91vw, 525px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    position: absolute;
    right: min(22vw, 122px);
    top: 22%;
    color: #a6a3a1;
  }
  input[type="text"] {
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
    text-overflow: clip;
    width: min(70vw, 440px);
    height: min(10vw, 50px);
    :focus {
      height: min(15vw, 75px);
    }
    transition: all 0.5s;
  }
  input[type="file"] {
    display: flex;
    width: 0px;
  }
  .custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
  input[type="submit"] {
    padding: 0;
    font-size: min(3vw, 15px);
    width: min(15vw, 75px);
    height: min(10vw, 50px);
  }
`;
