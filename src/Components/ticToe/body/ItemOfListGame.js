import React, { useState } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation, gql } from "@apollo/client";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const ItemOfListGame = ({ name, room }) => {
  const [gamerCount, setGamerCount] = useState(0);
  const currentUserId = JSON.parse(localStorage.getItem("user_id"));
  const history = useHistory();

  const { data } = useSubscription(
    gql`
      subscription GetListOfGames($id: Int) {
        users(where: { id: { _eq: $id } }) {
          name
        }
      }
    `,
    {
      variables: {
        id: currentUserId,
      },
    }
  );
  const currentUserName = data?.users[0].name;

  const [updateJoinToGame] = useMutation(
    gql`
      mutation JoinToGame(
        $id: Int!
        $joined_game: Int!
        $joined_game_name: String = ""
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

  const countGamersInRoom = () => {
    if (room[0]?.owner_game && gamerCount < 1) {
      setGamerCount(1);
    }
    if (room[0]?.joined_game && gamerCount < 2) {
      setGamerCount(2);
    }
  };

  const joinToGame = (id) => {
    if (currentUserId !== ownerGameId) {
      updateJoinToGame({
        variables: {
          id: id,
          joined_game: currentUserId,
          joined_game_name: currentUserName,
        },
      });
      history.push({ pathname: `/game-room/${roomId}` });
    }
  };

  if (gamerCount < 2) {
    countGamersInRoom();
  }

  const roomId = room[0]?.id;
  const ownerGameId = room[0]?.owner_game;
  const nameOwnerGame = room[0]?.owner_game_name;
  const nameJoinedGame = room[0]?.joined_game_name;

  return (
    <>
      <span className="itemGame">{name}</span>
      <div className="itemGame_body">
        {nameOwnerGame}

        <p className="itemGame_vs">vs</p>

        {nameJoinedGame !== `""` ? nameJoinedGame : null}
      </div>

      <div>
        <Button
          onClick={() => joinToGame(roomId)}
          variant="outline-info"
          className="itemGame_btn"
        >
          join
        </Button>
        <span
          className={gamerCount === 2 ? "gamerCount_full" : "gamerCount_part"}
        >
          {gamerCount}/2
        </span>
      </div>
    </>
  );
};

export default ItemOfListGame;
