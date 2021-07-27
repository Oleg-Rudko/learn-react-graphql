import React from "react";
import Loader from "../../Loader";
import ItemOfListGame from "./ItemOfListGame";

const BodyOfListTicToe = ({ data, loading }) => {
  const getGames = data?.game;
  // console.log(data, "get game body");
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
            <ItemOfListGame getGame={data} />
          )}
        </>
      )}
    </div>
  );
};

export default BodyOfListTicToe;
