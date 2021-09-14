import React from "react";
import { useParams } from "react-router";

export const OtherProfile = () => {
  const { uid } = useParams();
  return <div>{uid}의 프로필</div>;
};
