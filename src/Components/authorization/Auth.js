import React, { useEffect } from "react";
import MainPage from "../MainPage";
import AppsPage from "../AppsPage";
import { useQuery, gql } from "@apollo/client";
import { setUserCredential } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();
  const user_id = JSON.parse(window.localStorage.getItem("user_id")) || 0;
  const { data } = useQuery(
    gql`
      query getUser($user_id: Int!) {
        users(where: { id: { _eq: $user_id } }) {
          age
          city
          email
          id
          name
          assignments {
            id
          }
        }
      }
    `,
    {
      variables: {
        user_id: user_id,
      },
    }
  );

  useEffect(() => {
    if (data?.users[0]) {
      const result = data.users[0];
      const assignments = result.assignments[0];
      dispatch(
        setUserCredential({
          ...result,
          assignments: {
            ...assignments,
          },
        })
      );
    }
  }, [data, dispatch]);

  return (
    <>
      {JSON.parse(localStorage.getItem("isAuth")) ? <AppsPage /> : <MainPage />}
    </>
  );
};

export default Auth;
