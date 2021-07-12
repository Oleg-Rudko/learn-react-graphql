import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import Permissions from "../../../img/permissions.svg";
import PermissionUsersList from "./PermissionUsersList";
import { getAssignmentsId } from "../../../redux/selectors";
import { useSelector } from "react-redux";

const PermissionViewTodoModal = ({ userId }) => {
  const assignmentsId = useSelector(getAssignmentsId);
  const [show, setShow] = useState(false);

  const { data, refetch } = useQuery(
    gql`
      query GetPermission($user_id: Int!, $assignments_id: Int!) {
        assignments(
          where: { user_id: { _neq: $user_id }, has_many_todo_id: { _eq: $assignments_id } }
        ) {
          user_id
          id
          has_many_todo_id
          isChosen
        }
        users(where: { id: { _neq: $user_id } }) {
          name
          id
        }
      }
    `,
    {
      variables: {
        assignments_id: assignmentsId,
        user_id: userId,
      },
      fetchPolicy: "network-only",
    }
  );

  const arrUsers = data?.users;
  const arrAssignments = data?.assignments;
  // console.log(data?.assignments, 'assignments');
  // console.log(data, 'data');
  // console.log('Test ==== id: 95 / 33');
  // console.log(arrAssignments);

  return (
    <>
      <button onClick={() => setShow(true)} className="permissionBtn">
        <img
          className="permissionImg"
          src={Permissions}
          alt="Button permissions"
        />
      </button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Users can view todos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {arrUsers?.map((item) => (
            <div key={item.id}>
              <PermissionUsersList
                currentUser={item}
                listAssignments={arrAssignments}
                refetch={refetch}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PermissionViewTodoModal;
