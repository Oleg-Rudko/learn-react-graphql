import React from "react";
import Loader from "../../Loader";
import ItemOfListGame from "./ItemOfListGame";

const BodyOfListTicToe = ({ gamesAndRooms, loading }) => {
  return (
    <div>
      {gamesAndRooms?.length === 0 ? (
        <p className="listOfGames_warning">There are no games now</p>
      ) : (
        <>
          {loading ? (
            <div className="bodyOfList_loader">
              <Loader animation="border" variant="secondary" />
            </div>
          ) : (
            <ItemOfListGame gamesAndRooms={gamesAndRooms} />
          )}
        </>
      )}
    </div>
  );
};

export default BodyOfListTicToe;
