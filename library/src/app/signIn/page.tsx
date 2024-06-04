'use client';
import { userCtx } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

const SignIn = () => {
  const [userInput, setUserInput] = useState({ name: '', password: '' }); // State object to control the user and the password input
  const userContext = useContext(userCtx); // Importing the user context
  const router = useRouter(); // Creating an instance of router

  // Function to handle the submit process on the form
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.name !== '' && userInput.password !== '') {
      userContext?.setUser({
        name: 'Igor',
        age: 20,
        region: 'BR',
      });
      router.replace('/');
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
    <div className="text-black bg-white h-screen">
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>User</span>
          <input
            type="text"
            name="User"
            placeholder="User"
            onChange={handleInputs}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="Password"
            placeholder="Password"
            onChange={handleInputs}
          />
        </label>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default SignIn;
