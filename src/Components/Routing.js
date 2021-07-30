import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import SignUp from "./authorization/signUp/SignUp";
import Login from "./authorization/login/Login";
import Auth from "./authorization/Auth";
import Comments from "./todoApp/comments/Comments";
import EditPersonalData from "./todoApp/EditPersonalData";
import TodoApp from "./todoApp/TodoApp";
import ListOfGames from "./ticToe/ListOfGames";
import GameRoom from "./ticToe/gameRoom/GameRoom";

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/todo-app" component={TodoApp} />
        <Route path="/list-of-games" component={ListOfGames} />
        <Route path="/game-room/:id" component={GameRoom} />
        <Route path="/comments/:id" component={Comments} />
        <Route path="/edit-personal-data" component={EditPersonalData} />
      </Switch>
      <Redirect to="/" />
    </>
  );
};

export default Routing;
