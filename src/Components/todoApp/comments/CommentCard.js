import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router";
import Loader from "../../Loader";
import CommentDescription from "./CommentDescription";
import { XCircle } from "react-bootstrap-icons";

const CommentCard = ({ dataComment }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
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
    setLoading(true);
    removeComment({
      variables: {
        id: dataComment.id,
        todo_id: id,
      },
    }).then(() => setLoading(false));
  };

  return (
    <div className="commentCard">
      <div className="commentCard_description">
        <CommentDescription dataComment={dataComment} todoId={id} />

        {loading ? (
          <div className="commentCard_description-loader">
            <Loader animation="border" variant="danger" size="sm" />
          </div>
        ) : (
          <button onClick={removeCommentTodo} className="commentRemove_btn">
            <XCircle color="#ae4d4d" />
          </button>
        )}
      </div>
      <p className="commentCard_date-created">
        {dataComment.date_updated === null
          ? `Was created ${dataComment.date_created}`
          : `Was updated ${dataComment.date_updated}`}
      </p>
    </div>
  );
};

export default CommentCard;
