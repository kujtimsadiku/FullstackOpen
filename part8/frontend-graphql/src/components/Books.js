import { useMutation, useQuery } from "@apollo/client";
import { ALL_BOOKS, REMOVE_BOOK } from "../queries";

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  if (!props.show) {
    return null;
  }

  const removeHandler = async (book) => {
    console.log("id:", book.id);
    try {
      console.log(book);
      const removedBook = await removeBook({
        variables: { id: book.id },
      });
      console.log(removedBook);
    } catch (error) {
      console.log("error removing", error);
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data &&
            data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td>
                  <button onClick={() => removeHandler(a)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
