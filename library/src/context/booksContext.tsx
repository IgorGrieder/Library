'use client';
import { Book } from '@/types/types';
import axiosInstance from '@/utils/axios';
import { createContext, Dispatch, ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

type Context = {
  listBooks: Book[];
  setListBooks: Dispatch<React.SetStateAction<Book[]>>;
};

export const bookCtx = createContext<Context | undefined>(undefined);

const BookContext = ({ children }: Props) => {
  const [listBooks, setListBooks] = useState<Book[]>([]); // Initialize state with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get('/books');
        if (result.data) {
          setListBooks(result.data); // Update state with fetched data
        }
      } catch (err: unknown) {
        if (err instanceof Error) alert(err.message);
      }
    };

    fetchData(); // Call fetchData on component mount
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <bookCtx.Provider value={{ listBooks, setListBooks }}>
      {children}
    </bookCtx.Provider>
  );
};

export default BookContext;
