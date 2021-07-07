import React from "react";
import { useParams } from "react-router";
import { useQueryTodo } from "./useQueries";
import AddComment from "./AddComment";
import BtnReturnsBackToTodoList from "./BtnReturnsBackToTodoList";
import Loader from "../../Loader";
import CommentCard from "./CommentCard";

const Comments = () => {
  const { id } = useParams();
  const { todoName, comments, refetch, loading } = useQueryTodo({
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
              Todo Name — {" "}
              <span className="commentsComponent_todo-name">{todoName}</span>
            </h2>
            <h3 className="commentsComponent_title-h3">Comments:</h3>

            {comments.map((item) => (
              <div key={item.id}>
                <CommentCard dataComment={item} />
              </div>
            ))}

            <AddComment todoId={id} refetch={refetch} />
            <BtnReturnsBackToTodoList />
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
