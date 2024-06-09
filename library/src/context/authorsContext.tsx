'use client';
import { Author } from '@/types/types';
import { createContext, Dispatch, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

type Context = {
  listAuthors: Author[];
  setListAuthors: Dispatch<React.SetStateAction<Author[]>>;
};

const AuthorCtx = createContext<Context | undefined>(undefined); // Creating our Author context

const AuthorContext = ({ children }: Props) => {
  // Creating the listAuthor state
  const [listAuthors, setListAuthors] = useState<Author[]>([]);

  // Returning the context
  return (
    <AuthorCtx.Provider value={{ listAuthors, setListAuthors }}>
      {children}
    </AuthorCtx.Provider>
  );
};

export default AuthorContext;
