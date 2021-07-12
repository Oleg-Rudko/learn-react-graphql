import React from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { getAssignmentsId } from "../../../redux/selectors";
import { useSelector } from "react-redux";

const PermissionUsersList = ({ currentUser, listAssignments, refetch }) => {
  const isChecked = listAssignments.find(
    (item) => item.user_id === currentUser.id
  );

  const [setUserAssignment] = useMutation(
    gql`
      mutation SetAssignment(
        $user_id: Int!
        $has_many_todo_id: Int!
        $isChosen: Boolean
      ) {
        insert_assignments(
          objects: {
            has_many_todo_id: $has_many_todo_id
            user_id: $user_id
            isChosen: $isChosen
          }
          on_conflict: {
            constraint: assignments_user_id_has_many_todo_id_key
            update_columns: isChosen
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const assignmentsId = useSelector(getAssignmentsId);
  const complete = () => {
    setUserAssignment({
      variables: {
        user_id: currentUser.id,
        has_many_todo_id: assignmentsId,
        isChosen:
          isChecked?.isChosen === undefined ? true : !isChecked.isChosen,
      },
    }).then(() => refetch());
  };

  return (
    <div className="permissionUsersList">
      <label className="permissionUsersList_label">
        <input
          type="checkbox"
          onChange={complete}
          checked={isChecked?.isChosen || false}
        />
        <div>{currentUser.name}</div>
      </label>
    </div>
  );
};

export default PermissionUsersList;
