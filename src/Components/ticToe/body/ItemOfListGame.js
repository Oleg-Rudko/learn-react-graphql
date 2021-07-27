import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemOfListGame = ({ getGame }) => {
  const game = getGame?.game;
  // console.log(game, "getGame");

  return (
    <div className="listOfGame">
      {game?.map(({ name, id }) => (
        <div key={id} className="listOfGame_item">
          <span>{name}</span>
          <Link to={`/game-room/${id}`}>
            <Button variant="outline-info">join</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemOfListGame;
