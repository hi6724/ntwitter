import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { authService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "LogIn" : "CreateAccount"}CreateAccount
      </span>
    </>
  );
};
export default AuthForm;
