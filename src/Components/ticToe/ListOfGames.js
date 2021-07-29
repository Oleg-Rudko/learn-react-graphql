import React from "react";
import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/react-hooks";
import HeaderOfListTicToe from "./header/HeaderOfListTicToe";
import BodyOfListTicToe from "./body/BodyOfListTicToe";
import { useSelector } from "react-redux";
import { getAuthorizedUser } from "../../redux/selectors";

const ListOfGames = () => {
  const currentUser = useSelector(getAuthorizedUser);

  const { data, loading } = useSubscription(
    gql`
      subscription GetListOfGames {
        game {
          name
          id
          room {
            id
            owner_game
            joined_game
          }
        }
      }
    `,
    {
      fetchPolicy: "network-only",
    }
  );

  return (
    <div className="listOfGames">
      <div
        className={`${
          currentUser.name === undefined ? "warningTrue" : "warningFalse"
        } warning`}
      ></div>
      <div className="listOfGames_wrap">
        <HeaderOfListTicToe />
        <BodyOfListTicToe gamesAndRooms={data} loading={loading} />
      </div>
    </div>
  );
};

export default ListOfGames;
