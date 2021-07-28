import React from "react";
import { gql } from "@apollo/client";
import HeaderOfListTicToe from "./header/HeaderOfListTicToe";
import BodyOfListTicToe from "./body/BodyOfListTicToe";
import { useSubscription } from "@apollo/react-hooks";

const ListOfGames = () => {
  const { data } = useSubscription(
    gql`
      subscription GetListOfRooms {
        room {
          room_id
        }
      }
    `,
    {
      fetchPolicy: "network-only",
    }
  );
  // const gameRoom = data?.room;
  // console.log(data, "game room");

  return (
    <div className="listOfGames">
      <div className="listOfGames_wrap">
        <HeaderOfListTicToe />
        <BodyOfListTicToe getRooms={data} />
      </div>
    </div>
  );
};

export default ListOfGames;
