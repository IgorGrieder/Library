'use client';
import { Book } from '@/types/types';
import { createContext, Dispatch, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

type Context = {
  listBooks: Book[];
  setListBooks: Dispatch<React.SetStateAction<Book[]>>;
};

export const bookCtx = createContext<Context | undefined>(undefined); // Creating our book context

const BookContext = ({ children }: Props) => {
  // Creating the listBook state
  const [listBooks, setListBooks] = useState<Book[]>([]);

  // Returning the context
  return (
    <bookCtx.Provider value={{ listBooks, setListBooks }}>
      {children}
    </bookCtx.Provider>
  );
};

export default BookContext;
