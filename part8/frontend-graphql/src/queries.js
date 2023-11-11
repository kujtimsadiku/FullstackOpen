import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query getAuthor {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`;

export const UPDATE_BIRTH = gql`
  mutation updateBirthyear($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
