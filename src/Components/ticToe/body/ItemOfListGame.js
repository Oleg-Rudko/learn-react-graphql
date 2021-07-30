import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation, gql } from "@apollo/client";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const ItemOfListGame = ({ name, room }) => {
  const currentUserId = JSON.parse(localStorage.getItem("user_id"));
  const history = useHistory();

  const { data: getUserName } = useSubscription(
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
  const currentUserName = getUserName?.users[0].name;

  const { data } = useSubscription(
    gql`
      subscription {
        room {
          joined_game
          owner_game
        }
      }
    `
  );

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

  const gamerCount = data?.room[0];
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

        {nameJoinedGame === `""` || nameJoinedGame === ""
          ? null
          : nameJoinedGame}
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
          className={
            gamerCount?.joined_game ? "gamerCount_full" : "gamerCount_part"
          }
        >
          {gamerCount?.joined_game ? "2" : "1"}/2
        </span>
      </div>
    </>
  );
};

export default ItemOfListGame;
