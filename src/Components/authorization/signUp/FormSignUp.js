import React, { useState } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { setUserCredential, setLoading } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { spinner } from "../../../redux/selectors";
import Loader from "../../Loader";
import BtnBackMainPage from "./../../BtnBackMainPage";

const FormSignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingPage = useSelector(spinner);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    city: "",
  });

  const [addAssignments] = useMutation(
    gql`
      mutation AddAssignments($has_many_todo_id: Int!, $user_id: Int!) {
        update_assignments(
          where: { user_id: { _eq: $user_id } }
          _set: { has_many_todo_id: $has_many_todo_id }
        ) {
          affected_rows
        }
      }
    `
  );

  const [addUser] = useMutation(
    gql`
      mutation AddUser(
        $city: String!
        $age: Int!
        $email: String!
        $name: String!
        $password: String!
      ) {
        insert_users(
          objects: {
            age: $age
            city: $city
            email: $email
            name: $name
            password: $password
            assignments: { data: {} }
          }
        ) {
          returning {
            age
            city
            email
            name
            id
            assignments {
              id
            }
          }
          affected_rows
        }
      }
    `,
    {
      onCompleted: (e) => {
        if (e.insert_users.affected_rows === 2) {
          const result = e.insert_users.returning[0];
          const assignments_id = result.assignments[0].id;
          addAssignments({
            variables: {
              user_id: result.id,
              has_many_todo_id: assignments_id,
            },
          });
          window.localStorage.setItem("isAuth", true);
          window.localStorage.setItem("user_id", result.id);
          dispatch(setUserCredential(result));
          history.push({ pathname: "/" });
        }
      },
    }
  );

  const handleSubmit = (event) => {
    dispatch(setLoading(true));
    addUser({
      variables: {
        name: form.name,
        password: form.password,
        email: form.email,
        city: form.city,
        age: form.age,
      },
    }).then(() => {
      dispatch(setLoading(false));
    });
    setForm({ name: "", email: "", password: "", age: "", city: "" });
    event.preventDefault();
  };

  const onHandleInput = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="pageForm_sign-up">
      {loadingPage ? (
        <div className="formSingUp_loader">
          <Loader animation="border" variant="success" />
        </div>
      ) : (
        <div>
          <Form onSubmit={handleSubmit} className="formSignUp">
            <Form.Group>
              <Form.Label className="formSignUp_lable">Your name</Form.Label>
              <Form.Control
                placeholder="Your name"
                onChange={onHandleInput}
                name="name"
                value={form.name}
                tyep="text"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="formSignUp_lable">
                Email address
              </Form.Label>
              <Form.Control
                placeholder="Enter email"
                onChange={onHandleInput}
                name="email"
                value={form.email}
                type="email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="formSignUp_lable">Password</Form.Label>
              <Form.Control
                placeholder="Password"
                onChange={onHandleInput}
                name="password"
                value={form.password}
                type="password"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="formSignUp_lable">Age</Form.Label>
              <Form.Control
                placeholder="Enter your age"
                onChange={onHandleInput}
                name="age"
                value={form.age}
                type="number"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="formSignUp_lable">City</Form.Label>
              <Form.Control
                placeholder="Enter your City"
                onChange={onHandleInput}
                name="city"
                type="text"
                value={form.city}
              />
            </Form.Group>

            <div className="signUp_btn">
              <BtnBackMainPage variant="outline-success" />
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default FormSignUp;
