import React from "react";
import DisplayTodos from "./DisplayTodos";
import InputTodo from "./InputTodo";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { getFilterTodos, userId } from "../../redux/selectors";
import Loader from "../Loader";
import TodoDisplayButtons from "./buttonsControl/TodoDisplayButtons";
import PermissionViewTodoModal from "./permissionTodo/PermissionViewTodoModal";
import Logout from "../authorization/Logout";
import UserСard from "./UserСard";
import { useSubscription } from "@apollo/react-hooks";

const TodoApp = () => {
  const getUserId = useSelector(userId);
  const getFilterName = useSelector(getFilterTodos);

  const { data, refetch, loading } = useSubscription(
    gql`
      subscription MyTodos($user_id: Int!, $isActive: [Boolean!]) {
        todo(
          where: {
            assignments: { user_id: { _eq: $user_id } }
            isActive: { _in: $isActive }
          }
          order_by: { isActive: asc }
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
        isActive: getFilterName,
      },
      fetchPolicy: "network-only",
    }
  );

  return (
    <div className="todoApp">
      <UserСard />
      <div className="todoApp_wrap">
        <InputTodo refetch={refetch} />
        <div className="todoApp_displayTodo">
          {loading ? (
            <div className="todoApp_loader">
              <Loader animation="border" variant="success" />
            </div>
          ) : (
            <DisplayTodos data={data} refetch={refetch} />
          )}
        </div>
        <TodoDisplayButtons dataTodos={data} />
      </div>
      <div className="settingButtons">
        <PermissionViewTodoModal userId={getUserId} />
        <Logout />
      </div>
    </div>
  );
};

export default TodoApp;
