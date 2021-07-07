import React from "react";
import { Link } from "react-router-dom";
import Show from "../../../img/show.svg"

const ButtonComment = ({ todoId }) => {
  return (
    <button className="showComments" title="Open comments to this todo">
      <Link to={`/comments/${todoId}`}>
        <img className="showComments_img" src={Show} alt="Show comments" />
      </Link>
    </button>
  );
};

export default ButtonComment;
