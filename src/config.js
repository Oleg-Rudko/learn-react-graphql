import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const makeApolloClient = () => {
  const link = new WebSocketLink({
    uri: "wss://learn-react-graphql.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret":
            "tsVfe9x6NU1qE5yCyvbMJjDh5wKV86O6zE1U3yBBwfz2jZqk7ps8f5XQ52RLR1rC",
        },
      },
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
