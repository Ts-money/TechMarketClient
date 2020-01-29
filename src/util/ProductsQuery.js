import gql from "graphql-tag";

// Fetches all products using GraphQL Query.
export const FETCH_PRODUCTS_QUERY = gql`
  {
    getProducts {
      id
      name
      price
      imageURL
      createdAt
      username
    }
  }
`;