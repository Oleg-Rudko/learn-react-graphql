import React from "react";
import CloseGame from "../CloseGame";
import PlayerList from "./PlayerList";

const GameNavigation = ({ dataUsers }) => {
  return (
    <div className="gameNavigation">
      <div className="gameNavigation_wrap">
        <div className="gameNavigation_wrapper">
          <div className="gameNavigation_header">Are you ready?</div>
          <div className="gameNavigation_body">
            <PlayerList dataUsers={dataUsers} />
          </div>
        </div>
        <div className="gameNavigation_footer">
          <CloseGame />
        </div>
      </div>
    </div>
  );
};

export default GameNavigation;
