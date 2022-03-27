import { gql, useMutation } from "@apollo/client";
import { useAuthToken } from "./useAuthToken";
import * as React from "react";

export const loginMutationGQL = gql`
  mutation GetTokens($email: String!, $password: String!) {
    users {
      login(input: { email: $email, password: $password }) {
        token {
          accessToken
          refreshToken
        }
      }
    }
  }
`;
export const useLoginMutation = () => {
  const callBackRef = React.useRef<VoidFunction>();
  const [, setAuth] = useAuthToken("auth-token");
  const [, setRefresh] = useAuthToken("refresh-token");

  const [mutation] = useMutation(loginMutationGQL, {
    onCompleted: (data: any) => {
      setRefresh(data.users.login.token.refreshToken);
      setAuth(data.users.login.token.accessToken);
      if (callBackRef && callBackRef.current) callBackRef.current();
    },
  });

  const login = (email: string, password: string, callback: VoidFunction) => {
    callBackRef.current = callback;
    return mutation({
      variables: {
        email,
        password,
      },
    });
  };
  return [login];
};
