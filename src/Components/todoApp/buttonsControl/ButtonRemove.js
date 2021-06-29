import React from "react";
import { Button } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/actions";
import { useSelector } from "react-redux";
import { spinner } from "../../../redux/selectors";
import Loader from "./../../Loader";

const ButtonRemove = ({ refetch, id }) => {
  const dispatch = useDispatch();
  const loadingPage = useSelector(spinner);

  const [removeItemFromHasura] = useMutation(
    gql`
      mutation RemoveItemFromHasura($id: uuid!) {
        delete_todo(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `);

  const removeItem = (id) => {
    console.log('remove item');

    dispatch(setLoading(true));
    removeItemFromHasura({
      variables: {
        id,
      },
    }).then(() => {
      console.log('then');

      dispatch(setLoading(false));
      refetch();
    });
  };

  return (
    <>
      {loadingPage ? (
        <Loader />
      ) : (
        <Button
          onClick={() => removeItem(id)}
          disabled={loadingPage}
        >
          &#x166D;
        </Button>
      )}
    </>
  );
};

export default ButtonRemove;
