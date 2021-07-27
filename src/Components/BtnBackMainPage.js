import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowReturnLeft } from "react-bootstrap-icons";

const BtnBackMainPage = ({ variant }) => {
  return (
    <Link to="/todo-app">
      <Button variant={variant}>
        <ArrowReturnLeft />
      </Button>
    </Link>
  );
};

export default BtnBackMainPage;
