import React from "react";
import Loader from "../../Loader";
import ItemOfListGame from "./ItemOfListGame";

const BodyOfListTicToe = ({ gamesAndRooms, loading }) => {
  const arrGame = gamesAndRooms?.game;

  return (
    <div>
      {gamesAndRooms?.game.length === 0 ? (
        <p className="listOfGames_warning">There are no games now</p>
      ) : (
        <>
          {loading ? (
            <div className="bodyOfList_loader">
              <Loader animation="border" variant="secondary" />
            </div>
          ) : (
            <div className="listOfGame">
              {arrGame?.map(({ id, name, room }) => (
                <div key={id} className="listOfGame_item">
                  <ItemOfListGame name={name} room={room} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BodyOfListTicToe;
