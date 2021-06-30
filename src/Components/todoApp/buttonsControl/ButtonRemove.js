import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import Loader from "./../../Loader";

const ButtonRemove = ({ refetch, id }) => {
  const [loading, setLoading] = useState(false);

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
        <div className="btnRemove_loader">
          <Loader />
        </div>
      ) : (
        <button className="btnRemove" onClick={() => removeItem(id)}>
          &#x166D;
        </button>
      )}
      {/* <div className="btnRemove_loader">
        <Loader />
      </div> */}
    </>
  );
};

export default ButtonRemove;
