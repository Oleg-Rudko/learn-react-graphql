import React from "react";
import DisplayTodos from "./DisplayTodos";
import InputTodo from "./InputTodo";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { getFilterTodos, userId } from "../../redux/selectors";
import { Loader } from "../Loader";
import TodoDisplayButtons from "./buttonsControl/TodoDisplayButtons";

const TodoApp = () => {
  const getUserId = useSelector(userId);
  const getFilterName = useSelector(getFilterTodos);
  let showingReceivedTodos = getFilterName;

  const { data, refetch, loading } = useQuery(
    gql`
      query MyTodos($user_id: Int!, $isActive: [Boolean!]) {
        todo(
          where: { user_id: { _eq: $user_id }, isActive: { _in: $isActive } }
          order_by: { name: asc }
        ) {
          name
          id
          isActive
        }
      }
    `,
    {
      variables: {
        user_id: getUserId,
        isActive: showingReceivedTodos,
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
        <TodoDisplayButtons dataTodos={data} />
      </div>
    </div>
  );
};

export default TodoApp;
