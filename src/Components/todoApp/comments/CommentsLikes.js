import React from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { HandThumbsUp, HandThumbsDownFill } from "react-bootstrap-icons";

const CommentsLikes = ({ comments, refetch }) => {
  const likes = comments.likes;

  const [changeLikes] = useMutation(
    gql`
      mutation ChangeLike($id: uuid!, $likes: Int!) {
        update_comments(where: { id: { _eq: $id } }, _set: { likes: $likes }) {
          affected_rows
        }
      }
    `
  );

  const addLike = () => {
    if (likes >= 0) {
      changeLikes({
        variables: {
          id: comments.id,
          likes: likes + 1,
        },
      }).then(() => refetch());
    }
  };

  const dislike = () => {
    if (likes > 0) {
      changeLikes({
        variables: {
          id: comments.id,
          likes: likes - 1,
        },
      }).then(() => refetch());
    }
  };

  return (
    <div className="commentsLike_wrap">
      <button onClick={dislike} className="commentsDislike">
        <HandThumbsDownFill color="#fff" size="20" />
      </button>

      <button onClick={addLike} className="commentsLike">
        <HandThumbsUp color="#fff" size="20" />
      </button>
      <div>{likes}</div>
    </div>
  );
};

export default CommentsLikes;
