import { useSubscription } from "@apollo/react-hooks";
import { gql } from "../../../hooks/useQueryGraphql";

export const useSubscriptionsComments = (options) => {
  const result = useSubscription(
    gql`
      query GetTodoName($id: uuid!) {
        todo(where: { id: { _eq: $id } }) {
          name
          comments {
            description
            date_created
            date_updated
            likes
            id
          }
        }
      }
    `,
    options
  );

  return {
    loading: result.loading,
    todoName: result?.data?.todo[0].name || "",
    comments: result?.data?.todo[0].comments || [],
  };
};
