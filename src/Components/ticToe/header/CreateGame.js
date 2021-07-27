import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { userId } from "../../../redux/selectors";
import Loader from "../../Loader";

const CreateGame = ({ refetch }) => {
  const [titleGame, setTitleGame] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUserId = useSelector(userId);

  const onHandleInput = (e) => {
    setTitleGame(e.target.value);
  };

  const [createGame] = useMutation(
    gql`
      mutation CreateNewGame($created_by_user_id: Int!, $name: String!) {
        insert_game(
          objects: { created_by_user_id: $created_by_user_id, name: $name }
        ) {
          affected_rows
        }
      }
    `
  );

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      createGame({
        variables: {
          created_by_user_id: currentUserId,
          name: titleGame,
        },
      }).then(() =>
        refetch().then(() => {
          setTitleGame("");
          setShow(false);
          setLoading(false);
        })
      );
    }
  };

  return (
    <>
      <Button variant="outline-info" onClick={() => setShow(true)}>
        Create game
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Enter the name of your room <br /> to create a new game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader animation="border" variant="success" />
          ) : (
            <Form.Control
              type="text"
              placeholder="Enter title game"
              onChange={onHandleInput}
              onKeyDown={handleSubmit}
              value={titleGame}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => setShow(false)}>
            Create game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateGame;
