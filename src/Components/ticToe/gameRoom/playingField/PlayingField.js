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
          joined_game_name
          owner_game_name
          winner_name
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
        $winner_name: String
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
          _set: {
            move_game: $move_game
            game_symbol: $game_symbol
            winner_name: $winner_name
          }
        ) {
          affected_rows
        }
      }
    `
  );
  const [arrField, setArrField] = useState();
  const [hasuraSymbol, setHasuraSymbol] = useState(1);
  const [winnerName, setWinnerName] = useState("");
  const getGameSymbol = data?.room[0]?.game_symbol;
  const currentUserId = JSON.parse(window.localStorage.getItem("user_id"));
  const userMoveGameId = data?.room[0]?.move_game;
  const joinedGame = data?.room[0]?.joined_game;
  const joinedGameName = data?.room[0]?.joined_game_name;
  const ownerGameName = data?.room[0]?.owner_game_name;
  const ownerGame = data?.room[0]?.owner_game;
  const fields = data?.room[0]?.tic_toe[0];
  const winningCombo = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinningCombo = () => {
    winningCombo.map((item) => {
      if (typeof arrField[item[0]][1] === "number") {
        if (
          String(arrField[item[0]][1]) === String(arrField[item[1]][1]) &&
          String(arrField[item[1]][1]) === String(arrField[item[2]][1])
        ) {
          if (userMoveGameId === currentUserId) {
            ownerGame === currentUserId
              ? setWinnerName(joinedGameName)
              : setWinnerName(ownerGameName);

            // console.log(
            //   `${
            //     ownerGame === currentUserId ? joinedGameName : ownerGameName
            //   } winner`
            // );
          } else if (userMoveGameId !== currentUserId) {
            ownerGame === currentUserId
              ? setWinnerName(ownerGameName)
              : setWinnerName(joinedGameName);

            // console.log(
            //   `${
            //     ownerGame === currentUserId ? ownerGameName : joinedGameName
            //   } winner`
            // );
          }
        }
      }
    });
  };

  const conversionToGameSymbol = (fields) => {
    if (fields) {
      const arrOfFields = Object.entries(fields);
      arrOfFields.pop();
      setArrField(arrOfFields);
    }
  };

  useEffect(() => {
    if (arrField) {
      checkWinningCombo();
    }
  }, [arrField]);

  useEffect(() => {
    conversionToGameSymbol(fields);
  }, [fields]); // re-rendering for this depending

  useEffect(() => {
    if (getGameSymbol !== null && getGameSymbol !== undefined) {
      validationSymbols(getGameSymbol);
    }
  }, [getGameSymbol]);

  const validationSymbols = (symbol) => {
    if (symbol === 1) {
      setHasuraSymbol(0);
    }

    if (symbol === 0) {
      setHasuraSymbol(1);
    }
  };

  const makeMove = (index) => {
    putMoveGame({
      variables: {
        id: id,
        winner_name: winnerName,
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
