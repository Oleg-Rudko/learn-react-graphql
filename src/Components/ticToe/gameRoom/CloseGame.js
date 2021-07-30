import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const CloseGame = () => {
  const { id } = useParams();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const { data } = useQuery(
    gql`
      query MyQuery($id: Int!) {
        room(where: { id: { _eq: $id } }) {
          game_id
        }
      }
    `,
    {
      variables: {
        id: id,
      },
    }
  );

  const [closeRoomGame] = useMutation(
    gql`
      mutation JoinToGame($id: Int!, $game_id: Int!) {
        delete_game(where: { id: { _eq: $id } }) {
          affected_rows
        }
        delete_room(where: { game_id: { _eq: $game_id } }) {
          affected_rows
        }
      }
    `
  );

  const confirm = () => {
    if (data.room[0]?.game_id !== undefined) {
      const gameId = data.room[0]?.game_id;

      closeRoomGame({
        variables: {
          id: gameId,
          game_id: gameId,
        },
      });
      history.push({ pathname: "/list-of-games" });
    }
  };

  const closeGame = () => {
    setShow(true);
  };

  return (
    <div>
      <Button onClick={closeGame} variant="danger">
        Close the game
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this game?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={confirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CloseGame;
