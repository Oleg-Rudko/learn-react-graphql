import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Loading } from "../Loader";

const TodoItem = ({ name, id, refetch }) => {
  const [todoItemControl, setTodoItemControl] = useState({
    disabledItem: true,
    loading: false,
    editName: name,
  });

  let savePrevName = name;
  let countClicks = 0;

  const dblclick = () => {
    if (countClicks !== 2) {
      countClicks += 1;
      setTimeout(() => {
        countClicks = 0;
      }, 700);
    }

    if (countClicks === 2 && todoItemControl !== false) {
      setTodoItemControl((prev) => ({
        ...prev,
        disabledItem: false,
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
            disabledItem: true,
            loading: false,
          }));
        });
      });
    } else if (todoItemControl.editName === "") {
      setTodoItemControl((prev) => ({
        ...prev,
        editName: savePrevName,
        disabledItem: true,
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

  return (
    <>
      {todoItemControl.loading ? (
        <div className="loaderTodoItem">
          <Loading />
        </div>
      ) : (
        <form
          onClick={dblclick}
          onSubmit={submitEditTodoItem}
          className="formTodoItem"
        >
          <input
            type="text"
            className="todoItem"
            disabled={todoItemControl.disabledItem}
            onChange={onHandleInput}
            value={todoItemControl.editName}
          />
        </form>
      )}
    </>
  );
};

export default TodoItem;
