import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const CloseGame = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmBtn, setConfirmBtn] = useState("");
  const closeRoomMessage = "Are you sure you want to delete this game?";
  const leaveRoomMessage = "Are you sure you want to leave this room?";
  const currentUserId = JSON.parse(localStorage.getItem("user_id"));
  const { id } = useParams();
  const history = useHistory();

  const { data } = useQuery(
    gql`
      query GetDataRoom($id: Int!) {
        room(where: { id: { _eq: $id } }) {
          game_id
          owner_game
          joined_game
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

  const [leaveTheRoom] = useMutation(
    gql`
      mutation LeaveTheRoom(
        $id: Int!
        $joined_game: Int
        $joined_game_name: String!
      ) {
        update_room(
          where: { id: { _eq: $id } }
          _set: {
            joined_game: $joined_game
            joined_game_name: $joined_game_name
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const confirm = () => {
    if (confirmBtn === "close") {
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
    } else if (confirmBtn === "leave") {
      leaveTheRoom({
        variables: {
          id: id,
          joined_game: null,
          joined_game_name: "",
        },
      });
      history.push({ pathname: "/list-of-games" });
    }
  };

  const closeGame = (message, btn) => {
    setShow(true);
    setMessage(message);
    setConfirmBtn(btn);
  };

  const ownerGameId = data?.room[0].owner_game;
  const joinedGameId = data?.room[0].joined_game;

  return (
    <div className="closeGame">
      {joinedGameId === currentUserId && (
        <Button
          onClick={() => closeGame(leaveRoomMessage, "leave")}
          variant="warning"
        >
          Leave this game
        </Button>
      )}

      {ownerGameId === currentUserId && (
        <Button
          onClick={() => closeGame(closeRoomMessage, "close")}
          variant="danger"
        >
          Close the game
        </Button>
      )}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>

          {confirmBtn === "close" ? (
            <Button variant="primary" onClick={confirm}>
              Close game
            </Button>
          ) : (
            <Button variant="primary" onClick={confirm}>
              Leave room
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CloseGame;
