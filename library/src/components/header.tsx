'use client';
import { userCtx } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const Header = () => {
  const userContext = useContext(userCtx); // Getting the context
  const isLogged = userContext?.user.user !== null ? true : false; // Variable to determine if the user is logged or not to the Front end
  const router = useRouter(); // Instance of router to change the url

  const handleClickSignIn = () => {
    router.push('/signIn');
  };

  const seeUser = () => {
    console.log(userContext?.user);
  };

  return (
    <div className="flex items-center justify-center bg-green-700 px-10 py-8 text-white">
      <button onClick={seeUser}>See user</button>
      <h1 className="font-Barlow text-center text-3xl">
        Welcome to <br /> Grieder`s Library
      </h1>
      <button
        className="absolute right-12 flex flex-row items-center gap-3"
        onClick={handleClickSignIn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
          />
        </svg>
        <h1 className="text-xl font-light">
          {isLogged ? userContext?.user.user : 'Log in'}
        </h1>
      </button>
    </div>
  );
};

export default Header;
