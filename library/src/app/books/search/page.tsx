'use client';
import { Book } from '@/types/types';
import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react';

const Page = () => {
  const [book, setBook] = useState<Book | null>(null); // State variable to control the book information
  const useEffectCallback = async () => {
    // Getting the URL info to make the request
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());

    // Extract the query parameter 'name'
    const { name } = queryParams;

    if (name) {
      // If the name was passed by the query
      const result = await axiosInstance.get(`books/search?name=${name}`);
      setBook(result.data); // Setting the book based on the request
    }
  };

  // Use Effect to make a request for the specific book information
  useEffect(() => {
    useEffectCallback();
  }, []);

  return (
    <div className="h-screen bg-white text-black">
      pagina de busca de livro
      <div>{book?.name}</div>
      <div>{book?.author.name}</div>
      <div>{book?.price}</div>
    </div>
  );
};

export default Page;
