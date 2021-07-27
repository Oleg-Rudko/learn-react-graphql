import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { userId } from "../../redux/selectors";
import HeaderOfListTicToe from "./header/HeaderOfListTicToe";
import BodyOfListTicToe from "./body/BodyOfListTicToe";

const ListOfGames = () => {
  const currentUserId = useSelector(userId);

  const { data, refetch, loading } = useQuery(
    gql`
      query GetListOfGames($id: Int!) {
        game(where: { created_by_user_id: { _eq: $id } }) {
          name
          id
        }
      }
    `,
    {
      variables: {
        id: currentUserId,
      },
      fetchPolicy: "network-only",
    }
  );

  // console.log(data, "list of tic toe");

  return (
    <div className="listOfGames">
      <div className="listOfGames_wrap">
        <HeaderOfListTicToe refetch={refetch} />
        <BodyOfListTicToe data={data} loading={loading} />
      </div>
    </div>
  );
};

export default ListOfGames;
