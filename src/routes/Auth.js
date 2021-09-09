import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { authService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Auth = (props) => {
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
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    try {
      const result = await signInWithPopup(authService, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
