'use client';
import { USER_ID_KEY } from '@/components/header';
import { userCtx } from '@/context/userContext';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

const SignIn = () => {
  const [userInput, setUserInput] = useState({ user: '', password: '' }); // State object to control the user and the password input
  const userContext = useContext(userCtx); // Importing the user context
  const router = useRouter(); // Creating an instance of router

  // Function to handle the submit process on the form
  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the event to happen
    const form = e.currentTarget.closest('form'); // Getting the form to send it after the request
    try {
      const result = await axiosInstance.get(`/signIn`, {
        params: {
          name: userInput.user,
          password: userInput.password,
        },
      });
      if (result.data.found) {
        // Gattering the data
        let user = result.data.userInfo.name;
        let id = result.data.userInfo.id;

        // Setting the user Context to the equivalent inputs
        userContext?.setUser({
          user,
          id,
        });

        // Setting the localStorage to have the user identification too
        localStorage.setItem(
          USER_ID_KEY,
          JSON.stringify({
            user,
            id,
          }),
        );

        router.push('/'); // Returning to the main page if the login was sucessful
      } else alert('User not found... try again');
    } catch (err: any) {
      console.log('Request failed, try again');
      console.log(err.message);
    }
  };

  // Function to handle chagens on the inputs
  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.target.name; // Getting the name of the event target input element
    setUserInput({
      // cloning the object and changing the info dinamically for the specific field
      ...userInput,
      [eTarget]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white p-40 text-black">
      <form
        className="flex w-full flex-col items-center rounded-3xl border border-black bg-green-300 px-8 py-16 sm:min-h-[500px] sm:w-auto sm:min-w-[400px]"
        onSubmit={handleLogIn}
      >
        <h1 className="font-Barlow mb-20 text-center text-3xl">Log in</h1>
        <input
          type="text"
          name="user"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="User"
          onChange={handleInputs}
          required
        />
        <input
          type="password"
          name="password"
          className="mb-auto w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Password"
          onChange={handleInputs}
          required
        />
        <button type="submit" className="bg-red-500">
          Log in
        </button>
      </form>
    </div>
  );
};

export default SignIn;
