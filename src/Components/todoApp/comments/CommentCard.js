import React from "react";

const CommentCard = ({ dataComment }) => {
  return (
    <div className="commentCard">
      <div className="commentCard_description">
        <div className="commentCard_description-text">
          {dataComment.description}
        </div>
        <button className="commentCard_description-btn">x</button>
      </div>
      <p className="commentCard_date-created">
        Was created {dataComment.date_created}
      </p>
    </div>
  );
};

export default CommentCard;
