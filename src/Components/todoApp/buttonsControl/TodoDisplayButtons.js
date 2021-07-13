import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeFilterName } from "./../../../redux/actions";
import {
  ClipboardData,
  ClipboardPlus,
  ClipboardCheck,
} from "react-bootstrap-icons";

const TodoDisplayButtons = ({ dataTodos }) => {
  const dispatch = useDispatch();
  const countTodos = dataTodos?.todo.length;

  return (
    <div className="todoDisplayButtons">
      <ButtonGroup
        aria-label="Basic example"
        className="todoDisplayButtons_countTodos"
      >
        <div className="todoCountDisplay">Todo items {countTodos}</div>
        <div>
          <Button
            variant="light"
            onClick={() => dispatch(changeFilterName("default"))}
          >
            <ClipboardData size="30" />
          </Button>

          <Button
            variant="light"
            onClick={() => dispatch(changeFilterName("active"))}
          >
            <ClipboardPlus size="30" />
          </Button>
          <Button
            variant="light"
            onClick={() => dispatch(changeFilterName("completed"))}
          >
            <ClipboardCheck size="30" />
          </Button>
        </div>
      </ButtonGroup>
    </div>
  );
};

export default TodoDisplayButtons;
