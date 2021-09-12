import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { authService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
`;
const AuthForm = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onSubmit = async () => {
    const { email, password } = getValues();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;
  const Error = styled.h4``;
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          required
        />
      </Form>
      <span onClick={toggleAccount}>
        {newAccount ? "LogIn" : "CreateAccount"}CreateAccount
      </span>
      <Error>{error}</Error>
    </Container>
  );
};
export default AuthForm;
