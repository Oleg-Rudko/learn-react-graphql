import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemOfListGame = ({ getGame, getRoom }) => {
  const game = getGame?.game;
  const room = getRoom?.room;
  // console.log(room, "room");

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
