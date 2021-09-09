import { signOut } from "@firebase/auth";
import { authService } from "fBase";
import React from "react";
import { useForm } from "react-hook-form";

const Home = (props) => {
  const { register, handleSubmit, watch } = useForm({ mode: "onChange" });
  const hello = () => console.log("Hello");
  console.log(watch("nweet"));
  return (
    <div>
      <form onSubmit={handleSubmit(hello)}>
        <input
          {...register("nweet")}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;
