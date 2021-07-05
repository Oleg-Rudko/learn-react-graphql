import React from "react";
import ButtonRemove from "./buttonsControl/ButtonRemove";
import CompletedTodo from "./checkboxesComplete/CheckboxTodo";
import TodoItem from "./TodoItem";
import { spinner } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const DisplayTodos = ({ data, refetch }) => {
  const arrTodos = data?.todo;
  const loading = useSelector(spinner);

  return (
    <div className="displayTodo_list">
      {arrTodos?.map(({ name, id, isActive }) => (
        <div className="displayTodo_wrap" key={id}>
          <CompletedTodo id={id} refetch={refetch} isActive={isActive} />
          <TodoItem name={name} id={id} refetch={refetch} />
          <ButtonRemove id={id} refetch={refetch} />
        </div>
      ))}

      {loading && <Loader animation="border" variant="success" />}
    </div>
  );
};

export default DisplayTodos;
