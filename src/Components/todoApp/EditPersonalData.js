import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userId } from "../../redux/selectors";
import { Pencil } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import { useQuery, useMutation, gql } from "@apollo/client";
import EscapeOutside from "react-escape-outside";
import BtnBackMainPage from "./../BtnBackMainPage";
import Loader from "../Loader";

const EditPersonalData = () => {
  const currentUserId = useSelector(userId);
  const { data, refetch, loading } = useQuery(
    gql`
      query GetUserData($id: Int!) {
        users(where: { id: { _eq: $id } }) {
          password
          city
          name
          age
        }
      }
    `,
    {
      variables: {
        id: currentUserId,
      },
      fetchPolicy: "network-only",
    }
  );
  const userData = data?.users[0];

  const [updateUserData] = useMutation(
    gql`
      mutation UpdateUserData(
        $id: Int!
        $age: Int!
        $city: String!
        $name: String!
        $password: String!
      ) {
        update_users(
          where: { id: { _eq: $id } }
          _set: { age: $age, city: $city, name: $name, password: $password }
        ) {
          affected_rows
        }
      }
    `
  );

  useEffect(() => {
    setDataUser(() => ({
      yourName: userData?.name,
      yourAge: userData?.age,
      yourCity: userData?.city,
      yourPassword: userData?.password,
    }));
  }, [userData]);

  const [dataUser, setDataUser] = useState({
    yourName: "",
    yearAge: "",
    yourCity: "",
    yourPassword: "",
  });

  const [disabled, setDisabled] = useState({
    disabledName: true,
    disabledAge: true,
    disabledCity: true,
    disabledPassword: true,
    disabledLoader: true,
  });

  const handleClick = (disabledTitle, bool) => {
    setDisabled((prev) => ({
      ...prev,
      [disabledTitle]: bool,
    }));
  };

  const onHandleInput = ({ target: { name, value } }) => {
    setDataUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (disabledTitle, bool, e) => {
    if (e.keyCode === 13) {
      setDisabled((prev) => ({
        ...prev,
        [disabledTitle]: bool,
      }));
      updateUserData({
        variables: {
          id: currentUserId,
          name: dataUser.yourName,
          city: dataUser.yourCity,
          age: dataUser.yourAge,
          password: dataUser.yourPassword,
        },
      }).then(() => refetch());
    }
  };

  const handleEscapeOutside = (titleEscapeOutside, boolean) => {
    setDisabled((prev) => ({
      ...prev,
      [titleEscapeOutside]: boolean,
    }));
  };

  return (
    <div className="editPersonalData">
      <div className="editPersonalData_warp">
        <div className="editPersonalData_loader">
          {loading ? (
            <div className="displayTodo_loader">
              <Loader animation="border" variant="success" />
            </div>
          ) : (
            <div className="editPersonalData_wrapper">
              <div className="editPersonalData_blockInput">
                <p className="editPersonalData_title">Your name is:</p>
                {disabled.disabledName === true ? (
                  <div className="editPersonalData_input-disabled">
                    {userData?.name}
                  </div>
                ) : (
                  <EscapeOutside
                    onEscapeOutside={() =>
                      handleEscapeOutside("disabledName", true)
                    }
                    className="escapeOutside_input-width"
                  >
                    <Form.Control
                      name="yourName"
                      placeholder={userData?.name}
                      className="editPersonalData_input-edit"
                      size="lg"
                      type="text"
                      value={dataUser.yourName}
                      onChange={onHandleInput}
                      onKeyDown={(e) => handleSubmit("disabledName", true, e)}
                      autoFocus
                    />
                  </EscapeOutside>
                )}

                <button
                  onClick={() =>
                    handleClick("disabledName", !disabled.disabledName)
                  }
                  className="editBtn"
                >
                  <Pencil size="30" color="#fff" />
                </button>
              </div>

              <div className="editPersonalData_blockInput">
                <p className="editPersonalData_title">Your age is:</p>
                {disabled.disabledAge === true ? (
                  <div className="editPersonalData_input-disabled">
                    {userData?.age}
                  </div>
                ) : (
                  <EscapeOutside
                    onEscapeOutside={() =>
                      handleEscapeOutside("disabledAge", true)
                    }
                    className="escapeOutside_input-width"
                  >
                    <Form.Control
                      name="yourAge"
                      placeholder={userData?.age}
                      className="editPersonalData_input-edit"
                      size="lg"
                      type="number"
                      value={dataUser.yourAge}
                      onChange={onHandleInput}
                      onKeyDown={(e) => handleSubmit("disabledAge", true, e)}
                      autoFocus
                    />
                  </EscapeOutside>
                )}

                <button
                  onClick={() =>
                    handleClick("disabledAge", !disabled.disabledAge)
                  }
                  className="editBtn"
                >
                  <Pencil size="30" color="#fff" />
                </button>
              </div>

              <div className="editPersonalData_blockInput">
                <p className="editPersonalData_title">Your city is:</p>
                {disabled.disabledCity === true ? (
                  <div className="editPersonalData_input-disabled">
                    {userData?.city}
                  </div>
                ) : (
                  <EscapeOutside
                    onEscapeOutside={() =>
                      handleEscapeOutside("disabledCity", true)
                    }
                    className="escapeOutside_input-width"
                  >
                    <Form.Control
                      name="yourCity"
                      placeholder={userData?.city}
                      className="editPersonalData_input-edit"
                      size="lg"
                      type="text"
                      value={dataUser.yourCity}
                      onChange={onHandleInput}
                      onKeyDown={(e) => handleSubmit("disabledCity", true, e)}
                      autoFocus
                    />
                  </EscapeOutside>
                )}

                <button
                  onClick={() =>
                    handleClick("disabledCity", !disabled.disabledCity)
                  }
                  className="editBtn"
                >
                  <Pencil size="30" color="#fff" />
                </button>
              </div>

              <div className="editPersonalData_blockInput">
                <p className="editPersonalData_title">Password:</p>
                {disabled.disabledPassword === true ? (
                  <div className="editPersonalData_input-disabled">
                    {userData?.password}
                  </div>
                ) : (
                  <EscapeOutside
                    onEscapeOutside={() =>
                      handleEscapeOutside("disabledPassword", true)
                    }
                    className="escapeOutside_input-width"
                  >
                    <Form.Control
                      name="yourPassword"
                      placeholder={userData?.password}
                      className="editPersonalData_input-edit"
                      size="lg"
                      type="password"
                      value={dataUser.yourPassword}
                      onChange={onHandleInput}
                      onKeyDown={(e) =>
                        handleSubmit("disabledPassword", true, e)
                      }
                      autoFocus
                    />
                  </EscapeOutside>
                )}

                <button
                  onClick={() =>
                    handleClick("disabledPassword", !disabled.disabledPassword)
                  }
                  className="editBtn"
                >
                  <Pencil size="30" color="#fff" />
                </button>
              </div>
            </div>
          )}
        </div>

        <BtnBackMainPage variant="outline-success" />
      </div>
    </div>
  );
};

export default EditPersonalData;
