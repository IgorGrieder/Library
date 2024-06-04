'use client';
import { User } from '@/types/types';
import { createContext, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

type ContextUser = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const userCtx = createContext<ContextUser | undefined>(undefined);

const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    // Creating a context to provide current logged on user
    name: null,
    age: null,
    region: null,
  });

  return (
    <userCtx.Provider value={{ user, setUser }}>{children}</userCtx.Provider>
  );
};

export default UserContext;
