import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { authService, dbService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthInput, Form, Login, SubmitButton } from "style/AuthStyle";
import styled from "styled-components";
const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Error = styled.h4``;
const AuthForm = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async () => {
    const { email, password } = getValues();
    try {
      if (newAccount) {
        const result = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        await addDoc(collection(dbService, "user"), {
          uid: result.user.uid,
          photoURL: result.user.photoURL
            ? result.user.photoURL
            : "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg",
          displayName: result.user.displayName
            ? result.user.displayName
            : result.user.email.split("@")[0],
          nweets: [],
        });
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          {...register("email")}
          type="email"
          placeholder="Email"
          required
        />
        <AuthInput
          {...register("password")}
          type="password"
          placeholder="Password"
          required
        />
        <SubmitButton
          className="submit"
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          required
        />
      </Form>
      <Login onClick={toggleAccount}>
        {newAccount ? "LogIn" : "CreateAccount"}
      </Login>
      <Error>{error}</Error>
    </Container>
  );
};
export default AuthForm;
