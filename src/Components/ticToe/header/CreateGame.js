import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { userId } from "../../../redux/selectors";
import { useHistory } from "react-router";
import Loader from "../../Loader";

const CreateGame = ({ dataUser }) => {
  const [titleGame, setTitleGame] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUserId = useSelector(userId);
  const currentUserName = dataUser?.users.find(
    (item) => currentUserId === item.id
  );
  const history = useHistory();

  const [createGame] = useMutation(
    gql`
      mutation CreateNewGame($created_by_user_id: Int!, $name: String!) {
        insert_game(
          objects: { created_by_user_id: $created_by_user_id, name: $name }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        createNewRoom(data.insert_game.returning[0].id);
      },
    }
  );

  const [createTicToe] = useMutation(
    gql`
      mutation CreateNewTicToe($room_id: Int!) {
        insert_tic_toe(objects: { room_id: $room_id }) {
          affected_rows
        }
      }
    `
  );

  const [createRoom] = useMutation(
    gql`
      mutation CreateRoom(
        $game_id: Int!
        $owner_game: Int!
        $owner_game_name: String!
      ) {
        insert_room(
          objects: {
            game_id: $game_id
            owner_game: $owner_game
            owner_game_name: $owner_game_name
          }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        const creatingRoomId = data?.insert_room.returning[0].id;
        history.push({ pathname: `/game-room/${creatingRoomId}` });
        createNewTicToe(creatingRoomId);
      },
    }
  );

  const onHandleInput = (e) => {
    setTitleGame(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      createGame({
        variables: {
          created_by_user_id: currentUserId,
          name: titleGame,
        },
      }).then(() => {
        setTitleGame("");
        setShow(false);
        setLoading(false);
      });
    }
  };

  const createNewRoom = (gameId) => {
    if (gameId) {
      createRoom({
        variables: {
          game_id: gameId,
          owner_game: currentUserId,
          owner_game_name: currentUserName.name,
        },
      });
    }
  };

  const createNewTicToe = (roomId) => {
    if (roomId) {
      createTicToe({
        variables: {
          room_id: roomId,
        },
      });
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateGame;
