import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { spinner, getAssignmentsId } from "../../redux/selectors";

const InputTodo = () => {
  const [todo, setTodo] = useState({
    todoTask: "",
  });

  const assignmentsId = useSelector(getAssignmentsId);
  const loading = useSelector(spinner);

  const [addTodo] = useMutation(
    gql`
      mutation AddTodo($name: String!, $assignments_id: Int!) {
        insert_todo(objects: { assignments_id: $assignments_id, name: $name }) {
          affected_rows
        }
      }
    `
  );

  const handleSubmit = (event) => {
    addTodo({
      variables: {
        name: todo.todoTask,
        assignments_id: assignmentsId,
      },
    });

    setTodo({ todoTask: "" });
    event.preventDefault();
  };

  const onHandleInput = ({ target: { name, value } }) => {
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label className="inputTodo_label">Enter your todo</Form.Label>
          <Form.Control
            placeholder="Todo"
            onChange={onHandleInput}
            name="todoTask"
            value={todo.todoTask}
            type="text"
            required
            disabled={loading}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default InputTodo;
