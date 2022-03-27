import * as React from "react";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { parseJwt, useAuthToken } from "./useAuthToken";
import { useNavigate } from "react-router-dom";
import fetchRefreshTokens from "./RefreshMutation";

export const GRAPHQL_ENDPOINT =
  "https://tsarka-frontend-test.herokuapp.com/frontend/task/graphql";

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const useAppApolloClient = () => {
  let pendingAccessTokenPromise = React.useRef<any>();
  const [getAuth, setAuth, removeAuth] = useAuthToken("auth-token");
  const [getRefresh, setRefresh] = useAuthToken("refresh-token");
  let navigate = useNavigate();

  async function getRefreshedAccessTokenPromise() {
    try {
      const refreshCookie = getRefresh();

      const data = await fetchRefreshTokens(refreshCookie);
      const refreshToken = data.data.users.refresh.refreshToken;
      const authToken = data.data.users.refresh.accessToken;
      setRefresh(refreshToken);
      setAuth(authToken);

      return authToken;
    } catch (error) {
      return error;
    }
  }

  function getAccessTokenPromise() {
    const currentNumericDate = Math.round(Date.now() / 1000);

    const authCookie = getAuth();

    const refreshCookie = getRefresh();

    const authCookieValue = authCookie || "";
    const parsedToken = parseJwt(authCookieValue);
    if (parsedToken && parsedToken.exp) {
      if (currentNumericDate + 1 * 60 <= parsedToken.exp) {
        return new Promise((resolve) => resolve(authCookieValue));
      } else {
        removeAuth();

        if (!refreshCookie) {
          //redirect to login page, somehow we ended up with no refresh token and existing but invalid auth token
          navigate("/login");
        }
      }
    }

    if (!refreshCookie) {
      return new Promise((resolve) => resolve(""));
    }
    if (!pendingAccessTokenPromise.current)
      pendingAccessTokenPromise.current =
        getRefreshedAccessTokenPromise().finally(
          () => (pendingAccessTokenPromise.current = null)
        );

    return pendingAccessTokenPromise.current;
  }

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessTokenPromise();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const cache = new InMemoryCache({});

  return new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache,
  });
};
