'use client';
import { userCtx } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';

const SignIn = () => {
  const [userInput, setUserInput] = useState(''); // State variable to control the user
  const [passwordInput, setPasswordInput] = useState(''); // State variable to control the password
  const userContext = useContext(userCtx); // Importing the user context
  const router = useRouter(); // Creating an instance of router

  // Function to handle the submit process on the form
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput !== '' && passwordInput !== '') {
      userContext?.setUser({
        name: 'Igor',
        age: 20,
        region: 'BR',
      });
      router.replace('/');
    }
  };

  return (
    <div className="text-black bg-white h-screen">
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>User</span>
          <input
            type="text"
            placeholder="User"
            onChange={(e) => setUserInput(e.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </label>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default SignIn;
