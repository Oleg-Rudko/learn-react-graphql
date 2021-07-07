import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "./../../Loader";
import Remove from "../../../img/remove.svg";

const ButtonRemove = ({ refetch, id }) => {
  const [loading, setLoading] = useState(false);

  const [removeItemFromHasura] = useMutation(
    gql`
      mutation RemoveItemFromHasura($id: uuid!, $todo_id: uuid!) {
        delete_todo(where: { id: { _eq: $id } }) {
          affected_rows
        }
        delete_comments(where: { todo_id: { _eq: $todo_id } }) {
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
        todo_id: id,
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
          <Loader animation="border" variant="danger" />
        </div>
      ) : (
        <button className="btnRemove" onClick={() => removeItem(id)} title="Are You sure want to delete it?">
          <img className="btnRemove_img" src={Remove} alt="Remove todo item" />
        </button>
      )}
    </>
  );
};

export default ButtonRemove;
