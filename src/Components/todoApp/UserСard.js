import React from "react";
import { useSelector } from "react-redux";
import { getAuthorizedUser } from "../../redux/selectors";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const UserСard = () => {
  const currentUser = useSelector(getAuthorizedUser);

  return (
    <>
      <div className="userCard">
        <Link to="/edit-personal-data">
          <button className="userCard_btn">
            <PersonCircle size="30" color="#fff" />
          </button>
        </Link>
        Username: {currentUser.name}
      </div>
    </>
  );
};

export default UserСard;
