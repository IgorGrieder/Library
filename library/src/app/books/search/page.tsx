'use client';
import BookPage from '@/components/bookPage';
import CartSide from '@/components/cartSide';
import Header from '@/components/header';
import NameQueryError from '@/components/nameQueryError';
import { Book } from '@/types/types';
import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react';

const Page = () => {
  const [book, setBook] = useState<Book | null>(null); // State variable to control the book information
  const [nameQuery, setNameQuery] = useState(false); // State variable to control if there's a name query
  const [isLoading, setIsLoading] = useState(false); // State variabel to control if the request is being made
  const showError = nameQuery && isLoading; // Variable to determine if the error box is going to appear
  const [isShowingCart, setIsShowingCart] = useState(false); // State variable to control if the cart box is showing or not

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

  // Function to swap cart showing
  const handleCartClick = () => {
    setIsShowingCart(!isShowingCart);
  };

  return (
    <div className="min-h-screen bg-white pt-[100px] text-black">
      <Header handleCartClick={handleCartClick}></Header>
      {showError && <NameQueryError></NameQueryError>}
      <div className="cols-1 relative grid">
        <div className="flex justify-center">
          {book && (
            <BookPage
              _id={book._id}
              category={book?.category}
              author={book?.author}
              name={book?.name}
              price={book?.price}
              image={book?.image[0]}
              key={crypto.randomUUID()}
              isShowingCart={isShowingCart}
              handleClickCart={handleCartClick}
            ></BookPage>
          )}
        </div>
        {isShowingCart && (
          <CartSide
            handleCartClick={handleCartClick}
            key={crypto.randomUUID()}
          ></CartSide>
        )}
      </div>
    </div>
  );
};

export default Page;
