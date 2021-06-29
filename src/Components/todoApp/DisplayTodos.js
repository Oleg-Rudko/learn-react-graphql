import React from "react";
import ButtonRemove from "./buttonsControl/ButtonRemove";
import CompletedTodo from "./checkboxesComplete/CompletedTodo";
import TodoItem from "./TodoItem";

const DisplayTodos = ({ data, refetch }) => {
  const arrTodos = data?.todo;

  return (
    <ul>
      {arrTodos?.map(({ name, id, isActive }) => (
        <div key={id}>
          <CompletedTodo id={id} refetch={refetch} isActive={isActive} />
          <TodoItem name={name} />
          <ButtonRemove id={id} refetch={refetch} />
        </div>
      ))}
    </ul>
  );
};

export default DisplayTodos;
