import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BtnReturnsBackToTodoList = () => {
  return (
    <Link to="/">
      <Button variant="outline-info">Back</Button>
    </Link>
  );
};

export default BtnReturnsBackToTodoList;
