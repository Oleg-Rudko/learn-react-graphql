import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { useSubscription } from "@apollo/react-hooks";

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

  const { data: getTicToe } = useSubscription(
    gql`
      subscription GetIdTicToe($room_id: Int!) {
        tic_toe(where: { room_id: { _eq: $room_id } }) {
          id
        }
      }
    `,
    {
      variables: {
        room_id: id,
      },
    }
  );

  const [closeRoomGame] = useMutation(
    gql`
      mutation JoinToGame($id: Int!, $game_id: Int!, $tic_toe_id: Int!) {
        delete_game(where: { id: { _eq: $id } }) {
          affected_rows
        }
        delete_room(where: { game_id: { _eq: $game_id } }) {
          affected_rows
        }
        delete_tic_toe(where: { id: { _eq: $tic_toe_id } }) {
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
        $joined_game_ready: Boolean
        $game_symbol: Int
        $move_game: Int
        $idTicToe: Int
        $row_1: Int
        $row_2: Int
        $row_3: Int
        $row_4: Int
        $row_5: Int
        $row_6: Int
        $row_7: Int
        $row_8: Int
        $row_9: Int
      ) {
        update_room(
          where: { id: { _eq: $id } }
          _set: {
            joined_game: $joined_game
            joined_game_name: $joined_game_name
            joined_game_ready: $joined_game_ready
            move_game: $move_game
            game_symbol: $game_symbol
          }
        ) {
          affected_rows
        }
        update_tic_toe(
          where: { id: { _eq: $idTicToe } }
          _set: {
            row_1: $row_1
            row_2: $row_2
            row_3: $row_3
            row_4: $row_4
            row_5: $row_5
            row_6: $row_6
            row_7: $row_7
            row_8: $row_8
            row_9: $row_9
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
            tic_toe_id: ticToeId,
          },
        });
        history.push({ pathname: "/list-of-games" });
      }
    } else if (confirmBtn === "leave") {
      leaveTheRoom({
        variables: {
          idTicToe: ticToeId,
          row_1: null,
          row_2: null,
          row_3: null,
          row_4: null,
          row_5: null,
          row_6: null,
          row_7: null,
          row_8: null,
          row_9: null,
          id: id,
          joined_game: null,
          joined_game_name: "",
          joined_game_ready: false,
          move_game: null,
          game_symbol: 1,
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
  const ticToeId = getTicToe?.tic_toe[0]?.id;

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
