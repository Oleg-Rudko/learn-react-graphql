import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowReturnLeft } from "react-bootstrap-icons";

const BtnReturnsBackToTodoList = () => {
  return (
    <Link to="/">
      <Button variant="outline-info">
        <ArrowReturnLeft />
      </Button>
    </Link>
  );
};

export default BtnReturnsBackToTodoList;
