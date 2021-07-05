import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "../Loader";

const TodoItem = ({ name, id, refetch }) => {
  const [todoItemControl, setTodoItemControl] = useState({
    disabledItem: false,
    loading: false,
    editName: name,
  });

  const dblclick = (e) => {
    if (!todoItemControl.disabledItem) {
      console.log(e);
      setTodoItemControl((prev) => ({
        ...prev,
        disabledItem: true,
      }));
    }
  };

  const [editTodoItemToHasura] = useMutation(gql`
    mutation ($id: uuid!, $name: String!) {
      update_todo(where: { id: { _eq: $id } }, _set: { name: $name }) {
        affected_rows
        returning {
          name
        }
      }
    }
  `);

  const submitEditTodoItem = (e) => {
    if (todoItemControl.editName !== "") {
      setTodoItemControl((prev) => ({
        ...prev,
        loading: true,
      }));
      editTodoItemToHasura({
        variables: {
          id,
          name: todoItemControl.editName,
        },
      }).then(() => {
        refetch().then(() => {
          setTodoItemControl((prev) => ({
            ...prev,
            disabledItem: false,
            loading: false,
          }));
        });
      });
    }

    if (todoItemControl.editName === "") {
      setTodoItemControl((prev) => ({
        ...prev,
        editName: name,
        disabledItem: false,
      }));
    }
    e.preventDefault();
  };

  const onHandleInput = (e) => {
    setTodoItemControl((prev) => ({
      ...prev,
      editName: e.target.value,
    }));

    if (e.keyCode === 27) {
      setTodoItemControl((prev) => ({
        ...prev,
        editName: name,
        disabledItem: false,
      }));
    }
  };

  return (
    <>
      {todoItemControl.loading ? (
        <div className="loaderTodoItem">
          <Loader animation="grow" variant="secondary" size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        <form
          onDoubleClick={dblclick}
          onSubmit={submitEditTodoItem}
          className="formTodoItem"
        >
          <input
            type="text"
            className="todoItem"
            disabled={!todoItemControl.disabledItem}
            onChange={onHandleInput}
            onKeyDown={onHandleInput}
            value={todoItemControl.editName}
          />
        </form>
      )}
    </>
  );
};

export default TodoItem;
