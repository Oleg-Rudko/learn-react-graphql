import { useQueryGraphql, gql } from "../../../hooks/useQueryGraphql";

export const useQueryTodo = (options) => {
  const result = useQueryGraphql(
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
    refetch: result.refetch,
    todoName: result?.data?.todo[0].name || "",
    comments: result?.data?.todo[0].comments || [],
  };
};
