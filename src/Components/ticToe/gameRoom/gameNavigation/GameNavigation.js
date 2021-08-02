import React from "react";
import CloseGame from "../CloseGame";
import PlayerList from "./PlayerList";

const GameNavigation = () => {
  return (
    <div className="gameNavigation">
      <div className="gameNavigation_wrap">
        <div className="gameNavigation_header">Header</div>
        <div className="gameNavigation_body">
          <PlayerList />
        </div>
        <div className="gameNavigation_footer">
          <CloseGame />
        </div>
      </div>
    </div>
  );
};

export default GameNavigation;
