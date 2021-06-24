import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserCredential } from "../../../redux/actions";

const FormLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLogin, isSetLogin] = useState({
    email: "",
    password: "",
  });

  const { data } = useQuery(
    gql`
      query IsUsers($email: String!, $password: String!) {
        users(where: { password: { _eq: $password }, email: { _eq: $email } }) {
          id
          email
          name
          age
          city
        }
      }
    `,
    {
      variables: {
        email: isLogin.email,
        password: isLogin.password,
      },
    }
  );

  useEffect(() => {
    if (data?.users[0]) {
      const result = data.users[0];
      window.localStorage.setItem("isAuth", true);
      dispatch(setUserCredential(result));
      history.push({ pathname: "/" });
    }
  }, [data]);

  const handleSubmit = (event) => {
    isSetLogin(() => ({
      email: form.email,
      password: form.password,
    }));
    setForm({ email: "", password: "" });
    event.preventDefault();
  };

  const onHandleInput = ({ target: { type, value } }) => {
    setForm((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={onHandleInput}
          />
        </Form.Group>

        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onHandleInput}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default FormLogin;
