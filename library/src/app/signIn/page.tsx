'use client';
import PrimaryButtons from '@/components/primaryButtons';
import { userCtx } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

const SignIn = () => {
  const [userInput, setUserInput] = useState({ user: '', password: '' }); // State object to control the user and the password input
  const userContext = useContext(userCtx); // Importing the user context
  const router = useRouter(); // Creating an instance of router

  // Function to handle the submit process on the form
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the default behavior of a form
    // If the fields arent empty try to see if they're in the database
    if (userInput.user !== '' && userInput.password !== '') {
      // TO - DO create a db that will contain the admins and another with the users to consult here if theyre logged in or not
      userContext?.setUser({
        user: userInput.user,
        id: 1,
      });
      router.replace('/'); // Changing the url to the main page
      // Cleaning the inputs for safety reasons
      setUserInput({ user: '', password: '' });
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
        onSubmit={handleFormSubmit}
        className="flex w-full flex-col items-center rounded-3xl border border-black bg-green-300 px-8 py-16 sm:min-h-[500px] sm:w-auto sm:min-w-[400px]"
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
        <PrimaryButtons text="Log in"></PrimaryButtons>
      </form>
    </div>
  );
};

export default SignIn;
