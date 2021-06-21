import { HttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const makeApolloClient = () => {
  const link = new HttpLink({
    uri: "https://learn-react-graphql.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "tsVfe9x6NU1qE5yCyvbMJjDh5wKV86O6zE1U3yBBwfz2jZqk7ps8f5XQ52RLR1rC",
    },
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};

export default makeApolloClient;
