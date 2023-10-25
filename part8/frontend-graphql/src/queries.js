import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const COUNT_AUTHOR_BOOKS = gql`
  query getAuthorBooks($authorsName: String!) {
    allBooks(author: $authorsName)
  }
`;
