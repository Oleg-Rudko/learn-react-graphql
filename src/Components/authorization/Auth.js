import React from "react";
import MainPage from "../MainPage";

const Auth = () => (
  <>
    {JSON.parse(localStorage.getItem("isAuth")) ? (
      <div>todo</div>
    ) : (
      <MainPage />
    )}
  </>
);

export default Auth;
