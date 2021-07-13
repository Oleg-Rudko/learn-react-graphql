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
      mutation AddAssignments($user_id: Int!, $has_many_todo_id: Int!) {
        insert_assignments(
          objects: { has_many_todo_id: $has_many_todo_id, user_id: $user_id }
        ) {
          affected_rows
        }
      }
    `
  );

  const [deleteAssignments] = useMutation(
    gql`
      mutation deleteAssignment($id: Int!) {
        delete_assignments(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `
  );

  const complete = () => {
    setLoading(true);
    if (isChecked?.isChosen === undefined) {
      setUserAssignment({
        variables: {
          user_id: currentUser.id,
          has_many_todo_id: assignmentsId,
        },
      }).then(() =>
        refetch().then(() => {
          setLoading(false);
        })
      );
    }

    if (isChecked?.isChosen) {
      deleteAssignments({
        variables: {
          id: isChecked.id
        }
      }).then(() => refetch().then(() => {
        setLoading(false);
      }))
    }
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
