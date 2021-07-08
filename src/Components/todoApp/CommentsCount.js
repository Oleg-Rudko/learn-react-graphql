import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loader from "../Loader";

const CommentsCount = ({ todoId }) => {
  const { data, loading } = useQuery(
    gql`
      query CountComment($todo_id: uuid!) {
        comments(where: { todo_id: { _eq: $todo_id } }) {
          id
        }
      }
    `,
    {
      variables: {
        todo_id: todoId,
      },
      fetchPolicy: "network-only",
    }
  );
  const countComment = data?.comments.length;

  return (
    <>
      {loading ? (
        <div className="commentsCount_loader">
          <Loader animation="grow" variant="secondary" />
        </div>
      ) : (
        <div className="commentsCount" title="Left comments">
          {countComment}
        </div>
      )}
    </>
  );
};

export default CommentsCount;
