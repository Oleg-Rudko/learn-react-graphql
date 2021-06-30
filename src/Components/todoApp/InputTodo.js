import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { userId, spinner } from "../../redux/selectors";
import { setLoading } from "../../redux/actions";

const InputTodo = ({ refetch }) => {
  const [todo, setTodo] = useState({
    todoTask: "",
  });

  const getUuid = useSelector(userId);
  const dispatch = useDispatch();
  const loading = useSelector(spinner);

  const [addTodo] = useMutation(
    gql`
      mutation AddTodo($name: String!, $user_id: Int!) {
        insert_todo(objects: { user_id: $user_id, name: $name }) {
          affected_rows
        }
      }
    `);

  const handleSubmit = (event) => {
    dispatch(setLoading(true));
    addTodo({
      variables: {
        name: todo.todoTask,
        user_id: getUuid,
      },
    }).then(() =>
      refetch().then(() => {
        dispatch(setLoading(false));
      })
    );

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
