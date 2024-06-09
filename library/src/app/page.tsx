'use client';
import Header, { USER_ID_KEY } from '@/components/header';
import { bookCtx } from '@/context/booksContext';
import { userCtx } from '@/context/userContext';
import axiosInstance from '@/utils/axios';
import axios from 'axios';
import { useContext, useEffect } from 'react';

const Home = () => {
  const userContext = useContext(userCtx); // Getting the contexts
  const bookContext = useContext(bookCtx);

  const useEffectCallback = async () => {
    // Capturing information from the localStorage
    if (localStorage.getItem(USER_ID_KEY) !== null) {
      // In case there is information into the local storage
      const userObj = JSON.parse(localStorage.getItem(USER_ID_KEY) ?? '');
      userContext?.setUser({ ...userObj }); // Setting the user context to the information saved in the localStorage
    }

    // Making a request to get the books from the DB

    const result = await axiosInstance.get('/books');
    if (result.data) {
      bookContext?.setListBooks(result.data); // Setting the context to the books
    }
  };

  // Use effect to check if the localStorage has information about the current user
  useEffect(() => {
    useEffectCallback();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header></Header>
    </div>
  );
};

export default Home;
