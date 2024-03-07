// SavedBooks.jsx
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../../server/utils/queries';
import { REMOVE_BOOK } from '../../../server/utils/mutations';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
        update: cache => {
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
            query: GET_ME,
            data: { me: { ...me, savedBooks: me.savedBooks.filter(book => book.bookId !== bookId) } },
          });
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  // Render the saved books using the data from the GET_ME query
  return (
    <div>
      {data.me.savedBooks.map(book => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
        </div>
      ))}
    </div>
  );
  
};

export default SavedBooks;
