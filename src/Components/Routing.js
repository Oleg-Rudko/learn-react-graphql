import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import SignUp from "./authorization/signUp/SignUp";
import Login from "./authorization/login/Login";
import Auth from "./authorization/Auth";
import Comments from "./todoApp/comments/Comments";
import EditPersonalData from "./todoApp/EditPersonalData";

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/comments/:id" component={Comments} />
        <Route path="/edit-personal-data" component={EditPersonalData} />
      </Switch>
      <Redirect to="/" />
    </>
  );
};

export default Routing;
