import React from "react";
import { gql, useQuery } from "@apollo/client";

const App = () => {
  const { data } = useQuery(gql`
    query {
      todo {
        name
      }
    }
  `);
  console.log(data);
  return <div>Hello world!</div>;
};

export default App;
