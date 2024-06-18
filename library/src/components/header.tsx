'use client';
import { userCtx } from '@/context/userContext';
import { User } from '@/types/types';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export const USER_ID_KEY = 'USER_ID';

type Props = {
  setIsFinishedLocalStorage?: Dispatch<SetStateAction<boolean>>;
  handleCartClick?: VoidFunction;
};

const Header = ({ setIsFinishedLocalStorage, handleCartClick }: Props) => {
  const userContext = useContext(userCtx); // Getting the context
  const [showSignOut, setShowSignOut] = useState(false); // State variable to control the sign out box
  const [showBoxLogIn, setShowBoxLogIn] = useState(false); // State variable to control if the user box is going to be shown
  const router = useRouter(); // Instance of router to change the url

  // Function to check the current environment
  const checkCurrentEnviroment = (url: string) => {
    if (url.includes('checkout') || url.includes('cart')) return false;
    return true;
  };

  let isCartIconShow = true;
  if (typeof window !== 'undefined') {
    isCartIconShow = checkCurrentEnviroment(window.location.href);
  }

  useEffect(() => {
    // Capturing information from the localStorage
    const local = localStorage.getItem(USER_ID_KEY);
    if (local) {
      // In case there is information in the local storage
      const userObj = JSON.parse(local);
      userContext?.setUser({ ...userObj }); // Setting the user context to the information saved in the localStorage
    }

    // Showing the box after the process is done
    setShowBoxLogIn(true);
    if (setIsFinishedLocalStorage) {
      // If the function is sent through the parent
      setIsFinishedLocalStorage(true);
    }
  }, []);

  // Function to handle the click on the log in zone
  const handleClickSignIn = () => {
    // Checking if the user has already logged on or not
    if (userContext?.user.id === null) {
      router.push('/signIn');
    } else {
      setShowSignOut(!showSignOut);
    }
  };

  // Function to handle the sign out
  const handleClickSignOut = () => {
    // Clearing the user data
    const userEmpty = {
      ...userContext?.user,
      user: null,
      id: null,
      role: null,
      location: [],
      paymentMethod: [],
    };

    userContext?.setUser(userEmpty as User); // Changing the user in the context
    localStorage.setItem(USER_ID_KEY, JSON.stringify(userEmpty));
    setShowSignOut(false);
  };

  // Function to get back to the main menu
  const handleBackMenu = () => {
    router.push('/'); // Changing the url to the main one
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex items-center justify-center bg-green-700 px-10 py-8 text-white">
      <button className="absolute left-0 ml-10" onClick={handleBackMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </button>
      <h1 className="font-Barlow text-center text-3xl">Grieder`s Library</h1>
      {isCartIconShow && (
        <button className="absolute right-0 mr-5" onClick={handleCartClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      )}
      {showBoxLogIn && (
        <div className="grid-cols-custom absolute right-0 mr-16 grid gap-2 rounded-xl border p-3">
          <button
            onClick={handleClickSignIn}
            className="flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          <button
            className="text-md capitalize hover:underline"
            onClick={handleClickSignIn}
          >
            {userContext?.user.user !== null
              ? userContext?.user.user
              : 'Log in'}
          </button>
          {showSignOut && (
            <div className="col-span-2 flex justify-center">
              <button
                className="text-black hover:text-white hover:underline"
                onClick={handleClickSignOut}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
