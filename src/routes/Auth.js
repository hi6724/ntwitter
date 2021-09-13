import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import Color from "components/Color";
import { authService } from "fBase";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: ${Color.black};
  opacity: 0.9;
  height: 550px;
  border-radius: 25px;
`;
const Button = styled.button`
  position: relative;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  height: 50px;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
`;
const ButtonBox = styled.div`
  display: flex;
  .github:hover {
    background-color: #333333;
    color: #ffffff;
  }
  .google:hover {
    background-color: #de463b;
    color: #ffffff;
  }
`;
const Auth = (props) => {
  const onSocialClick = async (event) => {
    const {
      target: { className },
    } = event;
    console.log(className);
    let provider;
    if (className === "google") {
      provider = new GoogleAuthProvider();
      console.log("try google");
    } else if (className === "github") {
      provider = new GithubAuthProvider();
      console.log("try github");
    }
    try {
      const result = await signInWithPopup(authService, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />
      <AuthForm />
      <ButtonBox>
        <Button onClick={onSocialClick} name="google" className="google">
          <span className="google">Continue With Google &nbsp; &nbsp; </span>
          <FontAwesomeIcon className="google" icon={faGoogle} size="2x" />
        </Button>
        <Button onClick={onSocialClick} name="github" className="github">
          <span className="github">Continue With github &nbsp; &nbsp;</span>
          <FontAwesomeIcon className="github" icon={faGithub} size="2x" />
        </Button>
      </ButtonBox>
    </Container>
  );
};
export default Auth;
