import React from "react";

const DisplayTodos = ({data}) => {
  const arrTodos = data?.todo;
  console.log(arrTodos);

  return (
    <ul>
      {arrTodos?.map(({name, id}) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  )
};

export default DisplayTodos;
