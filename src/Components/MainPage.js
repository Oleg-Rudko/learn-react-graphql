import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <Link to="/login">
        <Button variant="outline-info">Login</Button>
      </Link>
      <Link to="/sign-up">
        <Button variant="outline-success">Sing Up</Button>
      </Link>
    </div>
  );
};

export default MainPage;
