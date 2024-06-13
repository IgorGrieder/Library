'use client';
import Card from '@/components/card';
import Header, { USER_ID_KEY } from '@/components/header';
import { bookCtx } from '@/context/booksContext';
import { userCtx } from '@/context/userContext';
import axiosInstance from '@/utils/axios';
import { useContext, useEffect } from 'react';

const Home = () => {
  const userContext = useContext(userCtx); // Getting the contexts
  const bookContext = useContext(bookCtx);

  // Function to make the request and return the data
  const req = async () => {
    try {
      const result = await axiosInstance.get('/books');
      if (result.data) {
        return result.data;
      }
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const useEffectCallback = async () => {
    try {
      // Capturing information from the localStorage
      if (localStorage.getItem(USER_ID_KEY) !== null) {
        // In case there is information in the local storage
        const userObj = JSON.parse(localStorage.getItem(USER_ID_KEY) ?? '');
        userContext?.setUser({ ...userObj }); // Setting the user context to the information saved in the localStorage
      }

      // Making a request to get the books from the DB
      const books = await req();
      if (books) {
        bookContext?.setListBooks(books); // Setting the context to the books
      }
    } catch (err) {
      console.error('Error in useEffectCallback:', err);
    }
  };

  // Use effect to check if the localStorage has information about the current user
  useEffect(() => {
    useEffectCallback();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header></Header>
      <div className="grid grid-cols-3 gap-4 sm:px-20 sm:py-10">
        {bookContext?.listBooks.map((item) => {
          return (
            <Card
              key={crypto.randomUUID()}
              id={item.id}
              image={item.image[0]}
              author={item.author}
              price={item.price}
              category={item.category}
              name={item.name}
            ></Card>
          );
        })}
      </div>
      {
        // TO DO - make the menu inside that div so when the user clicks on it will display shrinking the card
      }
    </div>
  );
};

export default Home;
