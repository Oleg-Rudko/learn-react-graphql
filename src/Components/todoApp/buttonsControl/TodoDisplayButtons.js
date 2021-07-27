import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeFilterName } from "./../../../redux/actions";
import {
  ClipboardData,
  ClipboardPlus,
  ArrowReturnLeft,
  ClipboardCheck,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const TodoDisplayButtons = ({ dataTodos }) => {
  const [message, setMessage] = useState("All");

  const dispatch = useDispatch();
  const countTodos = dataTodos?.todo.length;

  const showTodos = (disp, actionMessage) => {
    dispatch(changeFilterName(disp));
    setMessage(actionMessage);
  };

  return (
    <div className="todoDisplayButtons">
      <ButtonGroup
        aria-label="Basic example"
        className="todoDisplayButtons_countTodos"
      >
        <Link to="/">
          <Button variant="outline-success">
            <ArrowReturnLeft />
          </Button>
        </Link>
        <div className="todoCountDisplay">
          {message} {countTodos > 1 ? "todos" : "todo"} {countTodos}
        </div>
        <div>
          <Button
            variant="outline-light"
            onClick={() => showTodos("default", "All")}
          >
            <ClipboardData size="30" />
          </Button>

          <Button
            variant="outline-light"
            onClick={() => showTodos("active", "Active")}
          >
            <ClipboardPlus size="30" />
          </Button>
          <Button
            variant="outline-light"
            onClick={() => showTodos("completed", "Completed")}
          >
            <ClipboardCheck size="30" />
          </Button>
        </div>
      </ButtonGroup>
    </div>
  );
};

export default TodoDisplayButtons;
