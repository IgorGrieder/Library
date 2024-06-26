'use client';
import ErrorBox from '@/components/ErrorBox';
import { userCtx } from '@/context/userContext';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import ConfirmationBox from '@/components/confirmationBox';
import { Card, User, UserLocation } from '@/types/types';

type UserToDB = {
  name: string;
  passwordOne: string;
  passwordTwo: string;
};

const SignIn = () => {
  const [userInput, setUserInput] = useState<UserToDB>({
    name: '',
    passwordOne: '',
    passwordTwo: '',
  }); // State object to control the user and the password input
  const [inputError, setInputError] = useState(false); // State to check if the user didn't type the right in information
  const refUser = useRef(null); // Username input ref
  const refPasswordOne = useRef(null); // Password 1 input ref
  const controlKeys: string[] = []; // Array to control de fields
  const refPasswordTwo = useRef(null); // Password 2 input ref
  const refs: Record<string, RefObject<HTMLInputElement>> = {
    user: refUser,
    passwordOne: refPasswordOne,
    passwordTwo: refPasswordTwo,
  }; // Control object to call the respective refferences

  const userContext = useContext(userCtx); // Importing the user context
  const router = useRouter(); // Creating an instance of router

  // Function to handle chagens on the inputs
  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.target.name; // Getting the name of the event target input element
    e.target.style.border = ''; // Cleaning the possible border due to highlighting
    setUserInput({
      // cloning the object and changing the info dinamically for the specific field
      ...userInput,
      [eTarget]: e.target.value,
    });
  };

  // Function to highlight the inputs that have errors
  const highlightInputs = (str: string) => {
    if (str in refs) {
      const inputRef = refs[str];
      if (inputRef.current) {
        inputRef.current.style.border = '2px solid red'; // Highlight the input
        setUserInput((prevUserInputs) => ({
          ...prevUserInputs,
          [str]: '', // Reset only the specific field
        }));
      }
    }
  };

  // Function to validate the password
  const isValidPassword = (password: string) => {
    // Regular expression to check the conditions:
    // 1. At least one uppercase letter
    // 2. At least one special character
    // 3. Length between 6 and 20 characters
    const pattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,20}$/;

    return pattern.test(password);
  };

  // Function to validate the username
  const isValidUsername = async (username: string) => {};

  // Function to check if the inputs are filled
  const checkInputs = () => {
    const keys = Object.keys(userInput) as Array<keyof UserToDB>;
    keys.forEach((key) => {
      const value = userInput[key] ?? '';
      if (key === 'passwordOne' && !isValidPassword(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'name' && !isValidUsername(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
    });

    return controlKeys;
  };

  // Fcuntion to clear the inputs
  const clearInputs = () => {
    setUserInput({
      name: '',
      passwordOne: '',
      passwordTwo: '',
    });
  };

  // Function to control the sign in registration
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    if (userInput.name.length === 0 || userInput.passwordOne.length === 0)
      return; // End the function if one of the inputs are empty
  };

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-white p-40 text-black">
      <form
        className="flex w-full flex-col items-center rounded-3xl border border-black bg-green-300 px-8 py-16 sm:min-h-[500px] sm:w-auto sm:min-w-[400px]"
        onSubmit={handleSignIn}
      >
        <h1 className="font-Barlow mb-20 text-center text-3xl">Sign in</h1>
        <input
          ref={refUser}
          type="text"
          name="user"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="User"
          onChange={handleInputs}
          required
        />
        <input
          ref={refPasswordOne}
          type="password"
          name="passwordOne"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Password"
          onChange={handleInputs}
          required
        />
        <input
          ref={refPasswordTwo}
          type="password"
          name="passwordOne"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Password"
          onChange={handleInputs}
          required
        />
        <input
          type="submit"
          className="w-[100px] rounded-2xl border border-white bg-sky-700 px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
        >
          Sign in
        </input>
      </form>
      {inputError && (
        <div className="absolute right-14 top-10">
          <ErrorBox text="Incorrect username and/or password. Please try again."></ErrorBox>
        </div>
      )}
    </div>
  );
};

export default SignIn;
