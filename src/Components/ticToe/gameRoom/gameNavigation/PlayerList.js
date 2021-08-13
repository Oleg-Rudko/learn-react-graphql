import React, { useEffect, useCallback } from "react";
import Loader from "../../../Loader";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userId } from "../../../../redux/selectors";
import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const PlayerList = ({ dataUsers }) => {
  const currentUserId = useSelector(userId);
  const ownerName = dataUsers?.owner_game_name;
  const ownerId = dataUsers?.owner_game;
  const ownerGameReady = dataUsers?.owner_game_ready;
  const joinedName = dataUsers?.joined_game_name;
  const joinedId = dataUsers?.joined_game;
  const joinedGameReady = dataUsers?.joined_game_ready;
  const loaderForWaiting = [1, 2, 3, 4];
  const { id } = useParams();

  const [updateUserReadyPlay] = useMutation(
    gql`
      mutation UpdateUsersReadyPlay(
        $id: Int!
        $owner_game_ready: Boolean
        $joined_game_ready: Boolean
        $move_game: Int
      ) {
        update_room(
          where: { id: { _eq: $id } }
          _set: {
            owner_game_ready: $owner_game_ready
            joined_game_ready: $joined_game_ready
            move_game: $move_game
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const ready = (arg) => {
    if (arg === "owner") {
      updateUserReadyPlay({
        variables: {
          id: id,
          owner_game_ready: true,
          joined_game_ready: joinedGameReady,
        },
      });
    }

    if (arg === "joined") {
      updateUserReadyPlay({
        variables: {
          id: id,
          joined_game_ready: true,
          owner_game_ready: ownerGameReady,
        },
      });
    }
  };

  const moveGame = useCallback(() => {
    const arrUsersReady = [ownerId, joinedId];
    const randomElement =
      arrUsersReady[Math.floor(Math.random() * arrUsersReady.length)];
    updateUserReadyPlay({
      variables: {
        id: id,
        owner_game_ready: ownerGameReady,
        joined_game_ready: joinedGameReady,
        move_game: randomElement,
      },
    });
  }, [
    ownerGameReady,
    joinedGameReady,
    id,
    joinedId,
    ownerId,
    updateUserReadyPlay,
  ]);

  useEffect(() => {
    if (ownerGameReady && joinedGameReady) {
      moveGame();
    }
  }, [ownerGameReady, joinedGameReady, moveGame]);

  // Develop button before deploy button will be deleted
  const reset = () => {
    console.log("call reset");
    updateUserReadyPlay({
      variables: {
        id: id,
        joined_game_ready: false,
        owner_game_ready: false,
      },
    });
  };

  return (
    <ul className="playersList">
      <li className="playersList_item">
        <div className="playersList_item-readyInfo">
          <div className="playersList_loader">
            {joinedId ? (
              <div
                className={ownerGameReady ? "playersList_loader-wrap" : null}
              >
                <Loader animation="border" variant="info" size="sm" />
              </div>
            ) : null}
          </div>
          <div
            className={`${
              ownerGameReady ? "userIsReady" : "userIsNotReady"
            } warning playerList_warning`}
          ></div>
          <span className="playersList_name">{ownerName}</span>
        </div>
        <Button
          disabled={currentUserId === ownerId ? false : true}
          variant="success"
          size="sm"
          onClick={() => ready("owner")}
        >
          Ready
        </Button>
      </li>

      {!joinedId ? (
        <div className="playersList_item playersList_item-waiting">
          {loaderForWaiting.map((_, idx) => (
            <div key={idx}>
              <Loader animation="grow" variant="info" size="sm" />
            </div>
          ))}
        </div>
      ) : (
        <li className="playersList_item">
          <div className="playersList_item-readyInfo">
            <div className="playersList_loader">
              <div
                className={joinedGameReady ? "playersList_loader-wrap" : null}
              >
                <Loader animation="border" variant="info" size="sm" />
              </div>
            </div>
            <div
              className={`${
                joinedGameReady ? "userIsReady" : "userIsNotReady"
              } warning playerList_warning`}
            ></div>
            <span className="playersList_name">{joinedName}</span>
          </div>
          <Button
            disabled={currentUserId === joinedId ? false : true}
            variant="success"
            size="sm"
            onClick={() => ready("joined")}
          >
            Ready
          </Button>
        </li>
      )}
      {/* Develop button before deploy button will be deleted */}
      <button onClick={reset}>Reset</button>
    </ul>
  );
};

export default PlayerList;
