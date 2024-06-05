'use client';
import Header, { USER_ID_KEY } from '@/components/header';
import { userCtx } from '@/context/userContext';
import { useContext, useEffect } from 'react';

const Home = () => {
  const userContext = useContext(userCtx); //  // Getting the context

  // Use effect to check if the localStorage has information about the current user
  useEffect(() => {
    if (localStorage.getItem(USER_ID_KEY) !== null) {
      // In case there is information into the local storage
      const userObj = JSON.parse(localStorage.getItem(USER_ID_KEY) ?? '');
      userContext?.setUser({ ...userObj }); // Setting the user context to the information saved in the localStorage
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header></Header>
    </div>
  );
};

export default Home;
