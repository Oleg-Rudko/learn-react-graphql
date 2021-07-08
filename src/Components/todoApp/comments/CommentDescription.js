import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "../../Loader";

const CommentDescription = ({ dataComment, todoId, refetch }) => {
  const [edtiComment, setEditComment] = useState({
    disabledInput: false,
    loading: false,
    editDescription: dataComment.description,
  });

  const dblclick = () => {
    if (!edtiComment.disabledInput) {
      setEditComment((prev) => ({
        ...prev,
        disabledInput: true,
      }));
    }
  };

  const [editComment] = useMutation(gql`
    mutation EditComment(
      $todo_id: uuid!
      $id: uuid!
      $description: String!
      $date_updated: date
    ) {
      update_comments(
        where: { todo_id: { _eq: $todo_id }, id: { _eq: $id } }
        _set: { date_updated: $date_updated, description: $description }
      ) {
        affected_rows
        returning {
          description
          date_updated
        }
      }
    }
  `);

  const submitCommentUpdate  = (e) => {
    if (edtiComment.editDescription !== "") {
      setEditComment((prev) => ({
        ...prev,
        loading: true,
      }));
      editComment({
        variables: {
          id: dataComment.id,
          todo_id: todoId,
          description: edtiComment.editDescription,
        },
      }).then(() => {
        refetch().then(() => {
          setEditComment((prev) => ({
            ...prev,
            disabledInput: false,
            loading: false,
          }));
        });
      });
    }

    if (edtiComment.editDescription === "") {
      setEditComment((prev) => ({
        ...prev,
        editDescription: dataComment.description,
        disabledInput: false,
      }));
    }
    e.preventDefault();
  };

  const onHandleInput = (e) => {
    setEditComment((prev) => ({
      ...prev,
      editDescription: e.target.value,
    }));

    if (e.keyCode === 27) {
      setEditComment((prev) => ({
        ...prev,
        editDescription: dataComment.description,
        disabledInput: false,
      }));
    }
  };

  return (
    <>
      {edtiComment.loading ? (
        <div className="loaderTodoItem">
          <Loader animation="grow" variant="secondary" size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        <form
          onDoubleClick={dblclick}
          onSubmit={submitCommentUpdate }
          className="formTodoItem"
        >
          <input
            type="text"
            className="todoItem"
            disabled={!edtiComment.disabledInput}
            onChange={onHandleInput}
            onKeyDown={onHandleInput}
            value={edtiComment.editDescription}
          />
        </form>
      )}
    </>
  );
};

export default CommentDescription;
