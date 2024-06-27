'use client';
import ErrorBox from '@/components/ErrorBox';
import { userCtx } from '@/context/userContext';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import ConfirmationBox from '@/components/confirmationBox';

type UserToDB = {
  name: string;
  passwordOne: string;
  passwordTwo: string;
};

type InputError = {
  show: boolean;
  message: string;
};

const SignIn = () => {
  const [userInput, setUserInput] = useState<UserToDB>({
    name: '',
    passwordOne: '',
    passwordTwo: '',
  }); // State object to control the user and the password input
  const [inputError, setInputError] = useState<InputError>({
    show: false,
    message: '',
  }); // State to check if the user didn't type the right in information
  const refName = useRef(null); // Username input ref
  const refPasswordOne = useRef(null); // Password 1 input ref
  const refPasswordTwo = useRef(null); // Password 2 input ref
  const refs: Record<string, RefObject<HTMLInputElement>> = {
    name: refName,
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
    setInputError({ show: false, message: '' });
  };

  // Function to highlight the inputs that have errors
  const highlightInputs = (str: string, message: string) => {
    console.log(str + '  ' + message);

    if (str in refs) {
      const inputRef = refs[str];
      console.log(inputRef);
      if (inputRef.current) {
        setInputError({
          show: true,
          message,
        });
        console.log('mudou' + inputRef.current.value);

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
  const isValidUsername = async (username: string) => {
    let hasUser = true;
    // Making the request trying to find an specific user
    try {
      const result = await axiosInstance.get('/signIn', {
        params: { name: username },
      });
      if (result.data.found) {
        // If there`s already a user in the DB
        hasUser = false;
      }
    } catch (err) {
      console.log(err);
    }

    return hasUser;
  };

  // Function to check if the passwords match
  const isValidPasswordCheck = () => {
    if (userInput) {
      return userInput.passwordOne === userInput.passwordTwo;
    }
  };

  // Function to check if the inputs are filled
  const checkInputs = () => {
    const keys = Object.keys(userInput) as Array<keyof UserToDB>;
    const controlKeys: string[] = []; // Array to control de fields
    let errorMessage = ''; // Error message to be displayed

    const handleSearchUsername = async (value: string) => {
      try {
        const result = await isValidUsername(value);
        if (result) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    keys.forEach((key) => {
      const value = userInput[key] ?? '';
      if (key === 'name') {
        handleSearchUsername(value).then((usernameSearch) => {
          if (!usernameSearch) {
            errorMessage = `User with the name ${userInput.name} already exists, try another one.`;
            controlKeys.push(key);
            highlightInputs(key, errorMessage);
          }
        });
      } else {
        if (key === 'passwordOne' && !isValidPassword(value)) {
          errorMessage = `Password must be 6-20 characters long, contain at least one uppercase letter, and at least one special character.`;
          controlKeys.push(key);
          highlightInputs(key, errorMessage);
          // Clear the password verification
          setUserInput((userInput) => ({
            ...userInput,
            passwordTwo: '',
          }));
        }
        if (key === 'passwordTwo' && !isValidPasswordCheck()) {
          errorMessage = `${errorMessage.length > 0 ? '\n' : ''}Passwords must match.`;
          controlKeys.push(key);
          highlightInputs(key, errorMessage);
        }
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
  const handleSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault(); // Prevanting the default behavior
    if (userInput.name.length === 0 || userInput.passwordOne.length === 0)
      return; // End the function if one of the inputs are empty

    if (checkInputs().length === 0) {
      // If there aren`t any error occuring with the
      // TO DO - Make the registration in the DB
    }
  };

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-white p-40 text-black">
      <form className="flex w-full flex-col items-center rounded-3xl border border-black bg-green-300 px-8 py-16 sm:min-h-[500px] sm:w-auto sm:min-w-[400px]">
        <h1 className="font-Barlow mb-20 text-center text-3xl">Sign in</h1>
        <input
          ref={refName}
          type="text"
          name="name"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Type your user..."
          value={userInput.name}
          onChange={handleInputs}
          required
        />
        <input
          ref={refPasswordOne}
          type="password"
          name="passwordOne"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Type your password..."
          value={userInput.passwordOne}
          onChange={handleInputs}
          required
        />
        <input
          ref={refPasswordTwo}
          type="password"
          name="passwordTwo"
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Confirm your password..."
          value={userInput.passwordTwo}
          onChange={handleInputs}
          required
        />
        <button
          id="submit"
          type="submit"
          onClick={handleSignIn}
          className="mt-auto w-[200px] rounded-2xl border border-white bg-sky-700 px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
        >
          Create a new account
        </button>
      </form>
      {inputError.show && (
        <div className="absolute right-14 top-10">
          <ErrorBox text={inputError.message}></ErrorBox>
        </div>
      )}
    </div>
  );
};

export default SignIn;
