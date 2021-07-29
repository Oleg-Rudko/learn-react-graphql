import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemOfListGame = ({ gamesAndRooms }) => {
  const arrGame = gamesAndRooms?.game;
  console.log(arrGame, "arr game");

  return (
    <div className="listOfGame">
      {arrGame?.map(({ id, name, room }) => (
        <div key={id} className="listOfGame_item">
          <span className="itemGame">{name}</span>

          {`vs`}

          <div>
            <Link to={`/game-room/${room[0]?.id}`}>
              <Button variant="outline-info">join</Button>
            </Link>
            <span>0/2</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemOfListGame;
