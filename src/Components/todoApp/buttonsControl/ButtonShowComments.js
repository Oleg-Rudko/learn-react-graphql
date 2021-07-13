import React from "react";
import { Link } from "react-router-dom";
import { ChatFill, ChatDots } from "react-bootstrap-icons";

const ButtonComment = ({ todoId, countComment }) => {
  return (
    <button className="showComments" title="Open comments to this todo">
      <Link to={`/comments/${todoId}`}>
        {countComment ? (
          <ChatDots color="#6bd15a" size="30" />
        ) : (
          <ChatFill color="#6c757d" size="30" />
        )}
      </Link>
    </button>
  );
};

export default ButtonComment;
