import React, { useState } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const FormSignUp = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: '',
    city: "",
  });


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
          }
        ) {
          affected_rows
        }
      }
    `, {
      onCompleted: e => {
        if(e.insert_users.affected_rows === 1) {
          window.localStorage.setItem("isAuth", true);
          history.push({pathname: "/"});
        }
      }
    });

  const handleSubmit = (event) => {
    addUser({
      variables: {
        name: form.name,
        password: form.password,
        email: form.email,
        city: form.city,
        age: form.age,
      },
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
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Your name</Form.Label>
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
          <Form.Label>Email address</Form.Label>
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
          <Form.Label>Password</Form.Label>
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
          <Form.Label>Age</Form.Label>
          <Form.Control
            placeholder="Enter your age"
            onChange={onHandleInput}
            name="age"
            value={form.age}
            type="number"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder="Enter your City"
            onChange={onHandleInput}
            name="city"
            type="text"
            value={form.city}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default FormSignUp;
