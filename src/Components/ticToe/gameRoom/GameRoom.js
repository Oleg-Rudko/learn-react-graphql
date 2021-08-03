import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import GameNavigation from "./gameNavigation/GameNavigation";
import PlayingField from "./playingField/PlayingField";

const GameRoom = () => {
  const { data } = useSubscription(
    gql`
      subscription GetPlayersData {
        room {
          id
          owner_game
          joined_game
          owner_game_name
          joined_game_name
          owner_game_ready
          joined_game_ready
        }
      }
    `
  );

  const dataUsers = data?.room[0];

  return (
    <div className="gameRoom">
      <div className="gameRoom_wrap">
        <PlayingField />
        <GameNavigation dataUsers={dataUsers} />
      </div>
    </div>
  );
};

export default GameRoom;
