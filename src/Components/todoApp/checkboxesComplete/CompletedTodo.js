import React from "react";
import { useMutation, gql } from "@apollo/react-hooks";

const CompletedTodo = ({ id, refetch, isActive }) => {
  const [completeItemTodo] = useMutation(gql`
    mutation CompleteItemTodo($id: uuid!, $isActive: Boolean!) {
      update_todo(where: { id: { _eq: $id } }, _set: { isActive: $isActive }) {
        affected_rows
        returning {
          name
          id
        }
      }
    }
  `);

  const complete = (e) => {
    completeItemTodo({
      variables: {
        id,
        isActive: e.target.checked,
      }
    }).then(() => refetch());
  };

  return (
    <div className="completedCheckbox">
      <input
        checked={isActive}
        type="checkbox"
        id={id}
        onChange={complete}
        className="inputCheckbox"
        // value={isActive}
      />
    </div>
  );
};

export default CompletedTodo;
