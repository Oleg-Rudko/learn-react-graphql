import React from "react";
import { useSelector } from "react-redux";
import { getAuthorizedUser } from "../../redux/selectors";

const UserСard = () => {
  const currentUser = useSelector(getAuthorizedUser);

  return <div className="userCard">Username: {currentUser.name}</div>;
};

export default UserСard;
