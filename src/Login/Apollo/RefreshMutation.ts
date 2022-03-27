import { GRAPHQL_ENDPOINT } from "./ApolloClient";

const refreshTokenMutation = `
mutation RefreshTokens($refreshToken: String!) {
  users {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
}
`;
const fetchRefreshTokens = async (refreshToken: string) => {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: refreshTokenMutation,
      variables: {
        refreshToken,
      },
    }),
  });
  const data = await res.json();
  return data;
};

export default fetchRefreshTokens;
