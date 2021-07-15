import React from "react";
import ButtonRemove from "./buttonsControl/ButtonRemove";
import CompletedTodo from "./checkboxesComplete/CheckboxTodo";
import TodoItem from "./TodoItem";
import { spinner } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import CommentsCount from "./CommentsCount";

const DisplayTodos = ({ data }) => {
  const arrTodos = data?.todo;
  const loading = useSelector(spinner);

  return (
    <div className="displayTodo_list">
      {arrTodos?.map(({ name, id, isActive }) => (
        <div className="displayTodo_wrap" key={id}>
          <CompletedTodo id={id} isActive={isActive} />
          <TodoItem name={name} id={id} />
          <CommentsCount todoId={id} />
          <ButtonRemove id={id} />
        </div>
      ))}

      {loading && (
        <div className="displayTodo_loader">
          <Loader animation="border" variant="success" />
        </div>
      )}
    </div>
  );
};

export default DisplayTodos;
