import { gql, useQuery } from "@apollo/client";

const websiteQueryGQL = gql`
  query Websites {
    viewer {
      id
      email
      sites {
        id
        host
      }
    }
  }
`;

export const useWebsiteQuery = () => useQuery(websiteQueryGQL);
