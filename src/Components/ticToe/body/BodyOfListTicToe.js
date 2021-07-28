import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import Loader from "../../Loader";
import ItemOfListGame from "./ItemOfListGame";

const BodyOfListTicToe = ({ getRooms }) => {
  const { data, loading } = useSubscription(
    gql`
      subscription GetListOfGames {
        game {
          name
          id
        }
      }
    `,
    {
      fetchPolicy: "network-only",
    }
  );
  const getGames = data?.game;

  return (
    <div>
      {getGames?.length === 0 ? (
        <p className="listOfGames_warning">There are no games now</p>
      ) : (
        <>
          {loading ? (
            <div className="bodyOfList_loader">
              <Loader animation="border" variant="secondary" />
            </div>
          ) : (
            <ItemOfListGame getGame={data} getRoom={getRooms} />
          )}
        </>
      )}
    </div>
  );
};

export default BodyOfListTicToe;
