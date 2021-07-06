import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import SignUp from "./authorization/signUp/SignUp";
import Login from "./authorization/login/Login";
import Auth from "./authorization/Auth";
import Comments from "./todoApp/comments/Comments";

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/comments/:id" component={Comments} />
      </Switch>
      <Redirect to="/" />
    </>
  );
};

export default Routing;
