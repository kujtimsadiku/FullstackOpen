import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query GetAuthor {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
