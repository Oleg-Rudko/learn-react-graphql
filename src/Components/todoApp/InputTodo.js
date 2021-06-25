import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { userId } from "../../redux/selectors";

const InputTodo = () => {
  const [todo, setTodo] = useState({
    todoTask: "",
  });

  const getUuid = useSelector(userId)

  const [addTodo] = useMutation(
    gql`
      mutation AddTodo($name: String, $user_id: Int!) {
        insert_todo(
          objects: { user_id: $user_id, name: $name }
        ) {
          returning {
            id
            isActive
            name
            user_id
          }
          affected_rows
        }
      }
    `,
    {
      onCompleted: (e) => {

        console.log("sesseful");
      },
    }
  );

  const handleSubmit = (event) => {
    addTodo({
      variables: {
        name: todo.todoTask,
        user_id: getUuid,
      },
    });
    setTodo({todoTask: ""});
    event.preventDefault();
  };

  const onHandleInput = ({ target: { name, value } }) => {
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Enter your todo</Form.Label>
          <Form.Control
            placeholder="Todo"
            onChange={onHandleInput}
            name="todoTask"
            value={todo.todoTask}
            type="text"
            required
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default InputTodo;
