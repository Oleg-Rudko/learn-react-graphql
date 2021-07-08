import React from "react";
import { Link } from "react-router-dom";
import ShowIsComment from "../../../img/showIsComment.svg";
import ShowNotComment from "../../../img/showNotComment.svg";

const ButtonComment = ({ todoId, countComment }) => {
  return (
    <button className="showComments" title="Open comments to this todo">
      <Link to={`/comments/${todoId}`}>
        {countComment ? (
          <img
            className="showComments_img"
            src={ShowIsComment}
            alt="Show comments"
          />
        ) : (
          <img
            className="showComments_img"
            src={ShowNotComment}
            alt="Add comments"
          />
        )}
      </Link>
    </button>
  );
};

export default ButtonComment;
