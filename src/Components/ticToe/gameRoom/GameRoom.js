import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import GameNavigation from "./gameNavigation/GameNavigation";
import PlayingField from "./playingField/PlayingField";
import { useParams } from "react-router";

const GameRoom = () => {
  const { id } = useParams();
  const { data } = useSubscription(
    gql`
      subscription GetPlayersData($id: Int!) {
        room(where: { id: { _eq: $id } }) {
          id
          owner_game
          joined_game
          owner_game_name
          joined_game_name
          owner_game_ready
          joined_game_ready
          move_game
          winner_name
        }
      }
    `,
    {
      variables: {
        id: id,
      },
    }
  );

  const dataUsers = data?.room[0];
  const winnerName = data?.room[0]?.winner_name;

  return (
    <div className="gameRoom">
      <div className="gameRoom_wrap">
        <PlayingField />
        <GameNavigation dataUsers={dataUsers} />
      </div>
      {winnerName?.length > 0 && <div>Winner user {winnerName}</div>}
    </div>
  );
};

export default React.memo(GameRoom);
