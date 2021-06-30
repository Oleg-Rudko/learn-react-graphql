import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/main.css";

const MainPage = () => {
  return (
    <div className="mainPage">
        <Link to="/login">
          <Button variant="outline-info" className="mainPage_login">Login</Button>
        </Link>
        <Link to="/sign-up">
          <Button variant="outline-success" className="mainPage_sing-up">Sing Up</Button>
        </Link>
    </div>
  );
};

export default MainPage;
