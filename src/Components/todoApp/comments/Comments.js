import React from "react";
import { useParams } from "react-router";
import { useSubscriptionsComments } from "./useQueries";
import AddComment from "./AddComment";
import Loader from "../../Loader";
import CommentCard from "./CommentCard";
import { spinner } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import CommentsLikes from "./CommentsLikes";
import BtnBackMainPage from "../../BtnBackMainPage";

const Comments = () => {
  const { id } = useParams();
  const loader = useSelector(spinner);
  const { todoName, comments, loading } = useSubscriptionsComments({
    variables: { id: id },
  });

  return (
    <div className="commentsComponent">
      <div className="commentsComponent_wrap">
        {loading ? (
          <div className="commentsComponent_loading">
            <Loader animation="border" variant="success" />
          </div>
        ) : (
          <>
            <h2 className="commentsComponent_title">
              Todo Name —{" "}
              <span className="commentsComponent_todo-name">{todoName}</span>
            </h2>
            <h3 className="commentsComponent_title-h3">Comments:</h3>

            {comments.map((item) => (
              <div key={item.id}>
                <CommentCard dataComment={item} />
                <CommentsLikes comments={item} />
              </div>
            ))}

            {loader && (
              <div className="commentsComponent_loader">
                <Loader animation="border" variant="success" />
              </div>
            )}

            <AddComment todoId={id} />
            <BtnBackMainPage variant="outline-info" />
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
