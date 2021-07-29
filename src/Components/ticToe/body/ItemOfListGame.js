import React, { useState } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation, gql } from "@apollo/client";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { getAuthorizedUser } from "../../../redux/selectors";
import { useSelector } from "react-redux";

const ItemOfListGame = ({ name, room }) => {
  const [gamerCount, setGamerCount] = useState(0);
  const [isJoinedGame, setIsJoinedGame] = useState(false);
  const currentUserName = useSelector(getAuthorizedUser);
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
        id: room[0]?.owner_game,
      },
    }
  );

  const [updateJoinToGame] = useMutation(
    gql`
      mutation JoinToGame($id: Int!, $joined_game: Int!) {
        update_room(
          where: { id: { _eq: $id } }
          _set: { joined_game: $joined_game }
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
      console.log("click");
      setIsJoinedGame(true);
      updateJoinToGame({
        variables: {
          id: id,
          joined_game: currentUserId,
        },
      });
      // history.push({ pathname: `/game-room/${roomId}` });
    }
  };

  if (gamerCount < 2) {
    countGamersInRoom();
  }

  const roomId = room[0]?.id;
  const ownerGameId = room[0]?.owner_game;
  const nameOwnerGame = data?.users[0].name;
  const currentUserId = JSON.parse(localStorage.getItem("user_id"));

  return (
    <>
      <span className="itemGame">{name}</span>
      <div>
        {nameOwnerGame}

        <p>vs</p>

        {isJoinedGame ? currentUserName.name : ""}
      </div>

      <div>
        <Button onClick={() => joinToGame(roomId)} variant="outline-info">
          join
        </Button>
        <span>{gamerCount}/2</span>
      </div>
    </>
  );
};

export default ItemOfListGame;
