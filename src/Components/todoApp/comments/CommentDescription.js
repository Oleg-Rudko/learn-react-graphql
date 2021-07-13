import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "../../Loader";

const CommentDescription = ({ dataComment, todoId, refetch }) => {
  const [editComment, setEditComment] = useState({
    disabledInput: false,
    loading: false,
    editDescription: dataComment.description,
  });

  const dblclick = () => {
    if (!editComment.disabledInput) {
      setEditComment((prev) => ({
        ...prev,
        disabledInput: true,
      }));
    }
  };

  const todayDate = new Date().toISOString().slice(0, 10);

  const [editingComment] = useMutation(gql`
    mutation EditimgComment(
      $todo_id: uuid!
      $id: uuid!
      $description: String!
      $date_updated: date!
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

  const submitCommentUpdate = (e) => {
    if (editComment.editDescription !== "") {
      setEditComment((prev) => ({
        ...prev,
        loading: true,
      }));
      editingComment({
        variables: {
          id: dataComment.id,
          todo_id: todoId,
          description: editComment.editDescription,
          date_updated: todayDate,
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

    if (editComment.editDescription === "") {
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
      {editComment.loading ? (
        <div className="loaderTodoItem">
          <Loader animation="grow" variant="secondary" size="sm" />
          <span className="loading_span">Loading...</span>
        </div>
      ) : (
        <form
          onDoubleClick={dblclick}
          onSubmit={submitCommentUpdate}
          className="formTodoItem"
        >
          <input
            type="text"
            className={editComment.disabledInput ? "editableInput" : "todoItem"}
            disabled={!editComment.disabledInput}
            onChange={onHandleInput}
            onKeyDown={onHandleInput}
            value={editComment.editDescription}
          />
        </form>
      )}
    </>
  );
};

export default CommentDescription;
