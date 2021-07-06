import React from "react";
import { Link } from "react-router-dom";

const ButtonComment = ({ todoId }) => {
  return (
    <button>
      <Link to={`/comments/${todoId}`}>Open</Link>
    </button>
  );
};

export default ButtonComment;
