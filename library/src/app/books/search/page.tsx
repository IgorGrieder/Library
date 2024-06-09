'use client';
import Header from '@/components/header';
import NameQueryError from '@/components/nameQueryError';
import { Book } from '@/types/types';
import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react';

const Page = () => {
  const [book, setBook] = useState<Book | null>(null); // State variable to control the book information
  const [nameQuery, setNameQuery] = useState(false); // State variable to control if there's a name query
  const [isLoading, setIsLoading] = useState(false); // State variabel to control if the request is being made

  const useEffectCallback = async () => {
    // Getting the URL info to make the request
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    setIsLoading(true);

    // Extract the query parameter 'name's
    const { name } = queryParams;

    if (name) {
      // If the name was passed by the query
      const result = await axiosInstance.get(`books/search?name=${name}`);
      if (result.data.found) {
        setBook(result.data.foundBook); // Setting the book based on the request
        setNameQuery(true);
        setIsLoading(false);
      }
    }
  };

  // Use Effect to make a request for the specific book information
  useEffect(() => {
    useEffectCallback();
  }, []);

  return (
    <div className="h-screen bg-white text-black">
      <Header></Header>
      {!nameQuery && isLoading && <NameQueryError></NameQueryError>}
      pagina de busca de livro
      <div>{book?.name}</div>
      <div>{book?.author.name}</div>
      <div>{book?.price}</div>
    </div>
  );
};

export default Page;
