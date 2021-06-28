import React from "react";
import DisplayTodos from "./DisplayTodos";
import InputTodo from "./InputTodo";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { userId } from "../../redux/selectors";

const TodoApp = () => {
  const getUserId = useSelector(userId);
  const { data, refetch } = useQuery(
    gql`
      query MyTodos($user_id: Int!) {
        todo(where: { user_id: { _eq: $user_id } }, order_by: { name: asc }) {
          name
          id
        }
      }
    `,
    {
      variables: {
        user_id: getUserId,
      },
    }
  );

  return (
    <>
      <InputTodo refetch={refetch} />
      <DisplayTodos data={data} />
    </>
  );
};

export default TodoApp;
