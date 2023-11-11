// NewBook.test.js

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import NewBook from "../src/components/NewBook";
import { CREATE_BOOK } from "../src/queries";

const mocks = [
  {
    request: {
      query: CREATE_BOOK,
      variables: {
        title: "Test Book",
        author: "Test Author",
        published: 2023,
        genres: ["Test Genre"],
      },
    },
    result: {
      data: {
        addBook: {
          title: "Test Book",
          author: {
            name: "Test Author",
            born: null,
            bookCount: null,
          },
          published: 2023,
          genres: ["Test Genre"],
        },
      },
    },
  },
];

test("submitting the form adds a new book", async () => {
  const { screen } = render(
    <MockedProvider mocks={mocks}>
      <NewBook show={true} />
    </MockedProvider>
  );

  // Simulate user input
  fireEvent.change(screen.getByLabelText("title"), {
    target: { value: "Test Book" },
  });
  fireEvent.change(screen.getByLabelText("author"), {
    target: { value: "Test Author" },
  });
  fireEvent.change(screen.getByLabelText("published"), {
    target: { value: "2023" },
  });
  fireEvent.change(screen.getByLabelText("genre"), {
    target: { value: "Test Genre" },
  });

  // Click "add genre" button
  fireEvent.click(screen.getByText("add genre"));

  // Click "create book" button
  fireEvent.click(screen.getByText("create book"));

  // Wait for the mutation to complete
  await screen.findByText("genres: Test Genre");
});
