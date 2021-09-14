import styled from "styled-components";
export const Form = styled.form`
  position: relative;
  width: 525px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    position: absolute;
    right: 88px;
    top: 32%;
    color: #a6a3a1;
  }
  input[type="text"] {
    word-break: break-all;
    word-wrap: break-word;
    text-overflow: clip;
    width: 440px;
    height: 20px;
    :focus {
      height: 50px;
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
    height: 60px;
  }
`;
