import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useSubscription } from "@apollo/react-hooks";
import { useParams } from "react-router";

const PlayingField = () => {
  const { id } = useParams();
  const { data } = useSubscription(
    gql`
      subscription GetPlayersData($id: Int!, $room_id: Int!) {
        room(
          where: { id: { _eq: $id }, tic_toe: { room_id: { _eq: $room_id } } }
        ) {
          id
          move_game
          owner_game
          joined_game
          game_symbol
          tic_toe {
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
      }
    `,
    {
      variables: {
        room_id: id,
        id: id,
      },
    }
  );
  const [putMoveGame] = useMutation(
    gql`
      mutation PutMoveGame(
        $id: Int!
        $move_game: Int
        $game_symbol: Int
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
        update_room(
          where: { id: { _eq: $id } }
          _set: { move_game: $move_game, game_symbol: $game_symbol }
        ) {
          affected_rows
        }
      }
    `
  );
  const [arrField, setArrField] = useState();
  const [downloadSymbol, setDownloadSymbol] = useState({
    first: false,
    second: false,
  });
  const [hasuraSymbol, setHasuraSymbol] = useState(1);
  const getGameSymbol = data?.room[0]?.game_symbol;
  const currentUserId = JSON.parse(window.localStorage.getItem("user_id"));
  const userMoveGameId = data?.room[0]?.move_game;
  const joinedGame = data?.room[0]?.joined_game;
  const ownerGame = data?.room[0]?.owner_game;

  useEffect(() => {
    conversionToGameSymbol();
    if (!joinedGame) {
      setDownloadSymbol((prev) => ({
        ...prev,
        first: false,
        second: false,
      }));
    }
  }, [data]);

  useEffect(() => {
    validationSymbols(getGameSymbol);
  }, [getGameSymbol]);

  const conversionToGameSymbol = () => {
    const fields = data?.room[0]?.tic_toe[0];
    if (fields) {
      const arrOfFields = Object.entries(fields);
      arrOfFields.pop();
      setArrField(arrOfFields);
    }
  };

  const validationSymbols = (symbol) => {
    if (downloadSymbol.first && downloadSymbol.second) {
      if (symbol === 1) {
        setHasuraSymbol(0);
      } else if (symbol === 0) {
        setHasuraSymbol(1);
      }
    } else if (!downloadSymbol.first) {
      setDownloadSymbol((prev) => ({
        ...prev,
        first: true,
      }));
    } else if (!downloadSymbol.second) {
      setDownloadSymbol((prev) => ({
        ...prev,
        second: true,
      }));
    }
  };

  const makeMove = (index) => {
    putMoveGame({
      variables: {
        id: id,
        move_game: userMoveGameId === ownerGame ? joinedGame : ownerGame,
        game_symbol: hasuraSymbol,
        room_id: id,
        row_1: arrField[0][0] === index ? hasuraSymbol : arrField[0][1],
        row_2: arrField[1][0] === index ? hasuraSymbol : arrField[1][1],
        row_3: arrField[2][0] === index ? hasuraSymbol : arrField[2][1],
        row_4: arrField[3][0] === index ? hasuraSymbol : arrField[3][1],
        row_5: arrField[4][0] === index ? hasuraSymbol : arrField[4][1],
        row_6: arrField[5][0] === index ? hasuraSymbol : arrField[5][1],
        row_7: arrField[6][0] === index ? hasuraSymbol : arrField[6][1],
        row_8: arrField[7][0] === index ? hasuraSymbol : arrField[7][1],
        row_9: arrField[8][0] === index ? hasuraSymbol : arrField[8][1],
      },
    });
  };

  return (
    <div className="playingField">
      <div className="playingField_wrap">
        {arrField?.map((item) => (
          <div
            key={item[0]}
            onClick={() => makeMove(item[0])}
            className={`${
              userMoveGameId !== currentUserId ? "field_row-disabled" : null
            } field_row`}
          >
            {item[1] === null ? item[1] : item[1] === 1 ? "X" : "0"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PlayingField);
