import styled from "styled-components";

export const Nav = styled.div`
  padding: 0px 20px 10px 20px;
  height: 70px;
  border-radius: 25px;
  /* background-color: cyan; */
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: space-between;
  width: 525px;
  align-items: center;
  img {
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }

  span {
    display: none;
  }
  a {
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  a:hover {
    span {
      display: inline-block;
      z-index: 1;
      font-weight: 600;
      background-color: #9bd2c3;
      padding: 5px;
      top: 40px;
      border-radius: 5px;
      position: absolute;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100px;
    }
  }
`;
