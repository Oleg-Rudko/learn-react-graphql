import React, { useState } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { HandThumbsUp, HandThumbsDownFill } from "react-bootstrap-icons";
import Loader from "../../Loader";

const CommentsLikes = ({ comments }) => {
  const likes = comments.likes;
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (likes >= 0) {
      changeLikes({
        variables: {
          id: comments.id,
          likes: likes + 1,
        },
      }).then(() => setLoading(false));
    }
  };

  const dislike = () => {
    setLoading(true);
    if (likes > 0) {
      changeLikes({
        variables: {
          id: comments.id,
          likes: likes - 1,
        },
      }).then(() => setLoading(false));
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

      <div>
        {loading ? (
          <div className="completeTodoLoader commentsLike_loader">
            <Loader animation="border" variant="info" size="sm" />
          </div>
        ) : (
          <div className="countLikes">{likes}</div>
        )}
      </div>
    </div>
  );
};

export default CommentsLikes;
