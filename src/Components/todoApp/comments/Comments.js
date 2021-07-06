import React from "react";
import { useParams } from "react-router";
import { useQueryTodo } from "./useQueries";
import AddComment from "./AddComment";

const Comments = () => {
  const { id } = useParams();
  const { todoName, comments, refetch } = useQueryTodo({
    variables: { id: id },
  });

  return (
    <div>
      <h2>Todo Name — {todoName}</h2>
      <h3>Comments:</h3>
      {comments.map((item) => (
        <div key={item.id}>{item.description}</div>
      ))}
      <AddComment todoId={id} refetch={refetch} />
    </div>
  );
};

export default Comments;
