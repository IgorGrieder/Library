'use client';
import AuthorPage from '@/components/authorPage';
import Header from '@/components/header';
import NameQueryError from '@/components/nameQueryError';
import { Author } from '@/types/types';
import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react';

const Page = () => {
  const [Author, setAuthor] = useState<Author | null>(null); // State variable to control the Author information
  const [nameQuery, setNameQuery] = useState(false); // State variable to control if there's a name query
  const [isLoading, setIsLoading] = useState(false); // State variabel to control if the request is being made
  const showError = !nameQuery && isLoading;

  const useEffectCallback = async () => {
    // Getting the URL info to make the request
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    setIsLoading(true);

    // Extract the query parameter 'name's
    const { name } = queryParams;

    if (name) {
      // If the name was passed by the query
      const result = await axiosInstance.get(`authors/search?name=${name}`);
      if (result.data.found) {
        setAuthor(result.data.foundAuthor); // Setting the book based on the request
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
    <div className="h-screen overflow-hidden bg-white text-black">
      <Header></Header>
      {showError && <NameQueryError></NameQueryError>}
      <div className="flex justify-center">
        {Author && (
          <AuthorPage
            id={Author.id}
            age={Author?.age}
            image={Author?.image}
            name={Author?.name}
            key={crypto.randomUUID()}
            nationality={Author?.nationality}
          ></AuthorPage>
        )}
      </div>
    </div>
  );
};

export default Page;
