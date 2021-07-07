import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router";

const CommentCard = ({ dataComment, refetch }) => {
  const {id} = useParams();
  const [removeComment] = useMutation(
    gql`
      mutation RemoveComments($todo_id: uuid, $id: uuid!) {
        delete_comments(
          where: { todo_id: { _eq: $todo_id }, id: { _eq: $id } }
        ) {
          affected_rows
        }
      }
    `
  );

  const removeCommentTodo = () => {
    removeComment({
      variables: {
        id: dataComment.id,
        todo_id: id,
      },
    }).then(() => refetch());
  };

  return (
    <div className="commentCard">
      <div className="commentCard_description">
        <div className="commentCard_description-text">
          {dataComment.description}
        </div>
        <button
          onClick={removeCommentTodo}
          className="commentCard_description-btn"
        >
          x
        </button>
      </div>
      <p className="commentCard_date-created">
        Was created {dataComment.date_created}
      </p>
    </div>
  );
};

export default CommentCard;
