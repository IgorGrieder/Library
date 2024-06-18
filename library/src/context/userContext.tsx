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

export const userCtx = createContext<ContextUser | null>(null);

const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    // Creating a context to provide current logged on user
    user: null,
    id: null,
    role: null,
    address: [],
    shoppingValue: null,
    paymentMethod: [],
    cartItems: {},
  });

  return (
    <userCtx.Provider value={{ user, setUser }}>{children}</userCtx.Provider>
  );
};

export default UserContext;
