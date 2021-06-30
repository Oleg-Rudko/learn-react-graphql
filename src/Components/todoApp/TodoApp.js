import React from "react";
import DisplayTodos from "./DisplayTodos";
import InputTodo from "./InputTodo";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { userId } from "../../redux/selectors";
import Loader from "../Loader";

const TodoApp = () => {
  const getUserId = useSelector(userId);
  const { data, refetch, loading } = useQuery(
    gql`
      query MyTodos($user_id: Int!) {
        todo(where: { user_id: { _eq: $user_id } }, order_by: { name: asc }) {
          name
          id
          isActive
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
    <div className="todoApp">
      <div className="todoApp_wrap">
        <InputTodo refetch={refetch} />

        <div className="todoApp_displayTodo">

          {loading ? (
            <div className="todoApp_loader">
              <Loader />
            </div>
          ) : (
            <DisplayTodos data={data} refetch={refetch} />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
