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

export const ALL_BOOKS = gql`
  query GetBooks {
    allBooks {
      title
      author
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const UPDATE_BIRTH = gql`
  mutation updateBirthyear($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      setBornTo
    }
  }
`;
