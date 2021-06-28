import React from "react";
import ButtonRemove from "./buttonsControl/ButtonRemove";
import TodoItem from './TodoItem';


const DisplayTodos = ({data, refetch}) => {
  const arrTodos = data?.todo;

  return (
    <ul>
      {arrTodos?.map(({name, id}) => (
        <div key={id}>
          <TodoItem
            name={name}
          />
          <ButtonRemove
            id={id}
            refetch={refetch}
          />
        </div>
      ))}
    </ul>
  )
};

export default DisplayTodos;
