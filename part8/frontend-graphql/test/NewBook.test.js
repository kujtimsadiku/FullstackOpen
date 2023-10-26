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
          author: "Test Author",
          published: 2023,
          genres: ["Test Genre"],
        },
      },
    },
  },
];

describe("NewBook component", () => {
  it("submits a new book", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewBook />
      </MockedProvider>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/published/i), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: "Test Genre" },
    });

    fireEvent.click(screen.getByText(/add genre/i));

    // Submit the form
    fireEvent.click(screen.getByText(/create book/i));

    // Wait for the GraphQL mutation to complete
    await waitFor(() => {
      expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
      expect(screen.getByText(/2023/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Genre/i)).toBeInTheDocument();
    });
  });
});
