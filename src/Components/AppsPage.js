import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AppsPage = () => {
  return (
    <div className="appsPage">
      <h3 className="appsPage_title">Choose an application</h3>
      <div className="appsPage_links">
        <Link to="/todo-app">
          <Button className="link_todoApp" variant="outline-info">
            Todo App
          </Button>
        </Link>

        <Link to="/list-of-games">
          <Button className="link_ticToe" variant="outline-info">
            Tic Toe
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppsPage;
