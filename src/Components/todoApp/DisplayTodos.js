import React from "react";
import ButtonRemove from "./buttonsControl/ButtonRemove";
import CompletedTodo from "./checkboxesComplete/CompletedTodo";
import TodoItem from "./TodoItem";
import { spinner } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const DisplayTodos = ({ data, refetch }) => {
  const arrTodos = data?.todo;
  const loading = useSelector(spinner);

  return (
    <ul>
      {arrTodos?.map(({ name, id, isActive }) => (
        <div key={id}>
          <CompletedTodo id={id} refetch={refetch} isActive={isActive} />
          <TodoItem name={name} />
          <ButtonRemove id={id} refetch={refetch} />
        </div>
      ))}
      {loading && <Loader />}
    </ul>
  );
};

export default DisplayTodos;
