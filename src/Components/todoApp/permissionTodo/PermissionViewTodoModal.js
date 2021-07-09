import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import Permissions from "../../../img/permissions.svg";

const PermissionViewTodoModal = ({ userId }) => {
  const [show, setShow] = useState(false);

  const { data } = useQuery(
    gql`
      query GetUsers($id: Int!) {
        users(where: { id: { _neq: $id } }) {
          name
          id
        }
      }
    `,
    {
      variables: {
        id: userId,
      },
    }
  );

  const arrUsers = data?.users;
  useEffect(() => {}, [show]);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
              {item.name}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PermissionViewTodoModal;
