import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useSubscription } from "@apollo/react-hooks";
import { useParams } from "react-router";

const PlayingField = ({ dataRoom }) => {
  const [arrField, setArrField] = useState();
  const { id } = useParams();
  const userMoveGameId = dataRoom?.move_game;
  const currentUserId = JSON.parse(window.localStorage.getItem("user_id"));

  const { data } = useSubscription(
    gql`
      subscription GetFieldsTicToe($room_id: Int!) {
        tic_toe(where: { room_id: { _eq: $room_id } }) {
          row_1
          row_2
          row_3
          row_4
          row_5
          row_6
          row_7
          row_8
          row_9
        }
      }
    `,
    {
      variables: {
        room_id: id,
      },
    }
  );

  useEffect(() => {
    console.log(data, "playing field data");
  }, [data]);

  const [putMoveGame] = useMutation(
    gql`
      mutation PutMoveGame(
        $room_id: Int!
        $row_1: Int
        $row_2: Int
        $row_3: Int
        $row_4: Int
        $row_5: Int
        $row_6: Int
        $row_7: Int
        $row_8: Int
        $row_9: Int
      ) {
        update_tic_toe(
          where: { room_id: { _eq: $room_id } }
          _set: {
            row_1: $row_1
            row_2: $row_2
            row_3: $row_3
            row_4: $row_4
            row_5: $row_5
            row_6: $row_6
            row_7: $row_7
            row_8: $row_8
            row_9: $row_9
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const makeMove = (index) => {
    putMoveGame({
      variables: {
        room_id: id,
        row_1: arrField?.row_1,
        row_2: arrField?.row_2,
        row_3: arrField?.row_3,
        row_4: arrField?.row_4,
        row_5: arrField?.row_5,
        row_6: arrField?.row_6,
        row_7: arrField?.row_7,
        row_8: arrField?.row_8,
        row_9: arrField?.row_9,
      },
    });
  };

  useEffect(() => {
    const fields = data?.tic_toe[0];
    if (fields) {
      const arrOfFields = Object.entries(fields);
      arrOfFields.pop();
      setArrField(arrOfFields);
    }
  }, [data]);

  return (
    <div className="playingField">
      <div className="playingField_wrap">
        {arrField?.map((item) => (
          <div
            key={item[0]}
            onClick={() => makeMove(item[0])}
            className={`${
              userMoveGameId === currentUserId ? "field_row-disabled" : null
            } field_row`}
          >
            {item[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayingField;
