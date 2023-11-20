import { ALL_AUTHORS, REMOVE_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import UpdateBirth from "./UpdateBirth";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  // const [removeAuthor] = useMutation(REMOVE_AUTHOR, {
  //   refetchQueries: [{ query: ALL_AUTHORS }],
  // });

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  // const handleRemove = async (author) => {
  //   console.log("author id:", author);
  //   try {
  //     const removedAuthor = await removeAuthor({
  //       variables: { id: author.id },
  //     });
  //     console.log(removedAuthor);
  //   } catch (error) {
  //     console.log("author removed failed", error);
  //   }
  // };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              {/* <td>
                <button onClick={() => handleRemove(a)}>delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateBirth />
    </div>
  );
};

export default Authors;
