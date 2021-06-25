import React from "react";
import MainPage from "../MainPage";
import TodoApp from './../todoApp/TodoApp';

const Auth = () => (
  <>
    {JSON.parse(localStorage.getItem("isAuth")) ? (
      <TodoApp />
    ) : (
      <MainPage />
    )}
  </>
);

export default Auth;
