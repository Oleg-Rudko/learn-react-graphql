import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { spinner } from "../../../redux/selectors";
import Loader from "./../../Loader";

const ButtonRemove = ({ refetch, id }) => {
  const [loading, setLoading] = useState(false);
  const loadingPage = useSelector(spinner);

  const [removeItemFromHasura] = useMutation(
    gql`
      mutation RemoveItemFromHasura($id: uuid!) {
        delete_todo(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `
  );

  const removeItem = (id) => {
    setLoading(true);
    removeItemFromHasura({
      variables: {
        id,
      },
    }).then(() => {
      refetch().then(() => {
        setLoading(false);
      });
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Button onClick={() => removeItem(id)} disabled={loadingPage}>
          &#x166D;
        </Button>
      )}
    </>
  );
};

export default ButtonRemove;
