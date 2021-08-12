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
            owner_game_name
            joined_game_name
          }
        }
      }
    `,
    {
      fetchPolicy: "network-only",
    }
  );

  const { data: dataUser } = useSubscription(
    gql`
      subscription GetListOfGames {
        users {
          name
          id
        }
      }
    `
  );

  return (
    <div className="listOfGames">
      <div
        className={`${
          currentUser.name === undefined ? "userIsNotReady" : "userIsReady"
        } warning`}
      ></div>
      <div className="listOfGames_wrap">
        <HeaderOfListTicToe dataUser={dataUser} />
        <BodyOfListTicToe gamesAndRooms={data} loading={loading} />
      </div>
    </div>
  );
};

export default ListOfGames;
