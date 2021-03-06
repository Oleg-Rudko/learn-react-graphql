import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "../Loader";
import EscapeOutside from "react-escape-outside";

const TodoItem = ({ name, id }) => {
  const [todoItemControl, setTodoItemControl] = useState({
    disabledItem: false,
    loading: false,
    editName: name,
  });

  const dblclick = (e) => {
    if (!todoItemControl.disabledItem) {
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
        setTodoItemControl((prev) => ({
          ...prev,
          disabledItem: false,
          loading: false,
        }));
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
  };

  const handleEscapeOutside = () => {
    setTodoItemControl((prev) => ({
      ...prev,
      editName: name,
      disabledItem: false,
    }));
  };

  return (
    <>
      {todoItemControl.loading ? (
        <div className="loaderTodoItem">
          <Loader animation="grow" variant="secondary" size="sm" />
          <span className="loading_span">Loading...</span>
        </div>
      ) : (
        <>
          {todoItemControl.disabledItem === true ? (
            <form onSubmit={submitEditTodoItem} className="formTodoItem">
              <EscapeOutside onEscapeOutside={handleEscapeOutside}>
                <input
                  type="text"
                  className={
                    todoItemControl.disabledItem ? "editableInput" : "todoItem"
                  }
                  disabled={!todoItemControl.disabledItem}
                  onChange={onHandleInput}
                  onKeyDown={onHandleInput}
                  value={todoItemControl.editName}
                  autoFocus
                />
              </EscapeOutside>
            </form>
          ) : (
            <div className="formTodoItem" onDoubleClick={dblclick}>
              {todoItemControl.editName}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TodoItem;
