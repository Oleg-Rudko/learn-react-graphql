import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeFilterName } from "./../../../redux/actions";

const TodoDisplayButtons = ({ dataTodos }) => {
  const dispatch = useDispatch();
  const countTodos = dataTodos?.todo.length;

  return (
    <div className="todoDisplayButtons">
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="warning"
          onClick={() => dispatch(changeFilterName("default"))}
        >
          All todo
        </Button>

        <div className="todoCountDisplay">{countTodos}</div>
        <Button
          variant="success"
          onClick={() => dispatch(changeFilterName("active"))}
        >
          Active
        </Button>
        <Button
          variant="info"
          onClick={() => dispatch(changeFilterName("completed"))}
        >
          Complete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TodoDisplayButtons;
