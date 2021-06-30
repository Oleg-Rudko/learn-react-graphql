import React, { useState } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { LoaderSm } from "./../../Loader";

const CompletedTodo = ({ id, refetch, isActive }) => {
  const [onComplete, setOnComplete] = useState(false);
  const [completeItemTodo] = useMutation(gql`
    mutation CompleteItemTodo($id: uuid!, $isActive: Boolean!) {
      update_todo(where: { id: { _eq: $id } }, _set: { isActive: $isActive }) {
        affected_rows
        returning {
          name
          id
        }
      }
    }
  `);

  const complete = (e) => {
    setOnComplete(true);
    completeItemTodo({
      variables: {
        id,
        isActive: e.target.checked,
      },
    }).then(() =>
      refetch().then(() => {
        setOnComplete(false);
      })
    );
  };

  return (
    <>
      {onComplete ? (
        <div className="completedTodo_loader">
          <LoaderSm />
        </div>
      ) : (
        <div className="completedCheckbox">
          <input
            checked={isActive}
            type="checkbox"
            id={id}
            onChange={complete}
            className="inputCheckbox"
            // value={isActive}
          />
        </div>
      )}
    </>
  );
};

export default CompletedTodo;
