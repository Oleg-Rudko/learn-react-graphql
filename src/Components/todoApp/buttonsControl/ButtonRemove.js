import React from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const ButtonRemove = ({refetch, id}) => {
  const [removeItemFromHasura] = useMutation(gql`
    mutation RemoveItemFromHasura($id: uuid!) {
      delete_todo(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `);

  const removeItem = (id) => {
    removeItemFromHasura({
      variables: {
        id
      }
    }).then(() => refetch());
  };

  return (
    <>
      <Button onClick={() => removeItem(id)}>
        &#x166D;
      </Button>
    </>
  );
};

export default ButtonRemove;
