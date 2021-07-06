import { useQuery } from "@apollo/client";
export { gql } from "@apollo/client";

export const useQueryGraphql = (gqlQuery, options) =>
  useQuery(gqlQuery, { fetchPolicy: "network-only", ...options });
