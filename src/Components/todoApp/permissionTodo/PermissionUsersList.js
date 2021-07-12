import React, { useState } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { getAssignmentsId } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import Loader from "./../../Loader";

const PermissionUsersList = ({ currentUser, listAssignments, refetch }) => {
  const [loading, setLoading] = useState(false);
  const isChecked = listAssignments.find(
    (item) => item.user_id === currentUser.id
  );

  const assignmentsId = useSelector(getAssignmentsId);

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

  const complete = () => {
    setLoading(true);
    setUserAssignment({
      variables: {
        user_id: currentUser.id,
        has_many_todo_id: assignmentsId,
        isChosen:
          isChecked?.isChosen === undefined ? true : !isChecked.isChosen,
      },
    }).then(() =>
      refetch().then(() => {
        setLoading(false);
      })
    );
  };

  return (
    <div className="permissionUsersList">
      <label className="permissionUsersList_label">
        {loading ? (

          <div className="permissionUsers_loading">
            <Loader animation="border" variant="info" size="sm" />
          </div>
        ) : (
          <input
            className="permissionsUsers_input"
            type="checkbox"
            onChange={complete}
            checked={isChecked?.isChosen || false}
          />
        )}

        <div>{currentUser.name}</div>
      </label>
    </div>
  );
};

export default PermissionUsersList;
