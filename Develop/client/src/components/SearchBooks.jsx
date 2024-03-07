import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../../../server/utils/mutations';


const SearchBooks = () => {
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (bookData) => {
    try {
      await saveBook({
        variables: { ...bookData },
      });
      console.log('Book saved!');
    } catch (err) {
      console.error(err);
    }
  };



};

export default SearchBooks;
