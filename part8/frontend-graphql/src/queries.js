import { gql } from "@apollo/client";

const AuthorDetails = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

const BookDetails = gql`
  fragment BookDetails on Book {
    author {
      ...AuthorDetails
    }
    genres
    id
    published
    title
  }
  ${AuthorDetails}
`;

export const ALL_AUTHORS = gql`
  query getAuthor {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AuthorDetails}
`;

export const REMOVE_AUTHOR = gql`
  mutation removeAuthor($id: ID!) {
    removeAuthor(id: $id) {
      ...AuthorDetails
    }
  }
  ${AuthorDetails}
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genres: String) {
    allBooks(author: $author, genres: $genres) {
      ...BookDetails
    }
  }
  ${BookDetails}
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
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
      ...BookDetails
    }
  }
  ${BookDetails}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      ...BookDetails
    }
  }
  ${BookDetails}
`;

export const UPDATE_BIRTH = gql`
  mutation updateBirthyear($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, born: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AuthorDetails}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BookDetails}
`;
