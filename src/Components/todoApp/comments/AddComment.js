import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { setLoading } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const AddComment = ({ todoId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const [addComment] = useMutation(
    gql`
      mutation AddComment($todo_id: uuid!, $description: String!) {
        insert_comments(
          objects: { todo_id: $todo_id, description: $description }
        ) {
          affected_rows
        }
      }
    `
  );

  const handleSubmit = (event) => {
    dispatch(setLoading(true));
    addComment({
      variables: {
        todo_id: todoId,
        description: comment,
      },
    }).then(() => dispatch(setLoading(false)));
    setComment("");
    event.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label className="inputTodo_label">
            Enter your comment
          </Form.Label>
          <Form.Control
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
            name="todoComment"
            value={comment}
            type="text"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddComment;
