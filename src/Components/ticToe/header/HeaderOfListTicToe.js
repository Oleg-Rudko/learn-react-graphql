import React from "react";
import CreateGame from "./CreateGame";
import { Link } from "react-router-dom";
import { HouseDoor } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const HeaderOfListTicToe = ({ dataUser }) => {
  return (
    <div className="headerTicToe">
      <Link to="/">
        <Button variant="outline-success">
          <HouseDoor />
        </Button>
      </Link>

      <CreateGame dataUser={dataUser} />
    </div>
  );
};

export default HeaderOfListTicToe;
