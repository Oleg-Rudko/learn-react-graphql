import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeFilterName } from "./../../../redux/actions";

const TodoDisplayButtons = ({ dataTodos }) => {
  const dispatch = useDispatch();

  return (
    <div className="todoDisplayButtons">
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="warning"
          onClick={() => dispatch(changeFilterName("default"))}
        >
          All todo
        </Button>
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
