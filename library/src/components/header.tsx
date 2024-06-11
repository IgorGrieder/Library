'use client';
import { userCtx } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export const USER_ID_KEY = 'USER_ID';

const Header = () => {
  const userContext = useContext(userCtx); // Getting the context
  const [showSignOut, setShowSignOut] = useState(false); // State variable to control the sign out box
  const router = useRouter(); // Instance of router to change the url

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
    userContext?.setUser({ user: null, id: null });
    localStorage.removeItem(USER_ID_KEY);
    setShowSignOut(false);
  };

  // Function to get back to the main menu
  const handleBackMenu = () => {
    router.push('/'); // Changing the url to the main one
  };

  return (
    <div className="flex items-center justify-center bg-green-700 px-10 py-8 text-white">
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
            d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
          />
        </svg>
      </button>
      <h1 className="font-Barlow text-center text-3xl">Grieder`s Library</h1>
      <div className="grid-cols-custom absolute right-0 mr-10 grid gap-2 rounded-xl border p-3">
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
          {
            // Showing just the first name of the user
          }
          {userContext?.user.user !== null ? userContext?.user.user : 'Log in'}
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
    </div>
  );
};

export default Header;
