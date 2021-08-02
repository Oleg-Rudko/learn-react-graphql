import React from "react";
import GameNavigation from "./gameNavigation/GameNavigation";
import PlayingField from "./playingField/PlayingField";

const GameRoom = () => {
  return (
    <div className="gameRoom">
      <div className="gameRoom_wrap">
        <PlayingField />
        <GameNavigation />
      </div>
    </div>
  );
};

export default GameRoom;
