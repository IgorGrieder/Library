'use client';
import { USER_ID_KEY } from '@/components/header';
import ErrorBox from '@/components/ErrorBox';
import { userCtx } from '@/context/userContext';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useContext,
  useRef,
  useState,
} from 'react';
import ConfirmationBox from '@/components/confirmationBox';

const SignIn = () => {
  const [userInput, setUserInput] = useState({ user: '', password: '' }); // State object to control the user and the password input
  const [wrongLogIn, setWrongLogIn] = useState(false); // State to check if the user typed a wrong log in information
  const [inputError, setInputError] = useState(false); // State to check if the user didn't type the right in information
  const [emailSent, setEmailSent] = useState(false); // State to show a message confirmation
  const refPasswordInput = useRef<HTMLInputElement>(null); // Refference to the password input
  const userContext = useContext(userCtx); // Importing the user context
  const router = useRouter(); // Creating an instance of router

  // Function to handle the submit process on the form
  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the event to happen

    // Checking if the inputs are empty
    if (userInput.user.length < 0 || userInput.password.length < 0) {
      setInputError(true);
      return;
    }

    try {
      const result = await axiosInstance.get(`/login`, {
        params: {
          name: userInput.user,
          password: userInput.password,
        },
      });
      if (result.data.found) {
        // Gattering the data
        let user = result.data.userInfo.name;
        let id = result.data.userInfo.id;
        let address = result.data.userInfo.address;
        let role = result.data.userInfo.role;
        let paymentMethod = result.data.userInfo.paymentMethod;
        let cartItems;
        let shoppingValue;

        const local = localStorage.getItem(USER_ID_KEY);
        if (local) {
          cartItems = JSON.parse(local).cartItems;
          shoppingValue = JSON.parse(local).shoppingValue;
        } else {
          cartItems = {};
          shoppingValue = '0.00';
        }

        // Setting the user Context to the equivalent inputs
        userContext?.setUser({
          user,
          address,
          role,
          id,
          paymentMethod,
          cartItems,
          shoppingValue,
        });

        // Setting the localStorage to have the user identification too
        localStorage.setItem(
          USER_ID_KEY,
          JSON.stringify({
            user,
            id,
            address,
            role,
            paymentMethod,
            cartItems,
            shoppingValue,
          }),
        );

        router.back(); // Returning to the page it was previously
      } else {
        // Cleaning the messages
        setEmailSent(false);
        setInputError(false);
        setWrongLogIn(true);
      }
    } catch (err: any) {
      console.log('Request failed, try again');
      console.log(err.message);
    }
  };

  // Function to handle chagens on the inputs
  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.target.name; // Getting the name of the event target input element
    setWrongLogIn(false);
    setInputError(false);
    setUserInput({
      // cloning the object and changing the info dinamically for the specific field
      ...userInput,
      [eTarget]: e.target.value,
    });
  };

  // Function to show the password clicking in the checkbox
  const handlePasswordCheckbox: MouseEventHandler<HTMLInputElement> = (e) => {
    if (!refPasswordInput.current) return; // In case the ref is null end the function
    // Switch the input type between 'password' and 'text'
    if (refPasswordInput.current.type === 'password') {
      refPasswordInput.current.type = 'text';
    } else {
      refPasswordInput.current.type = 'password';
    }
  };

  // Function to simulate an email being sent
  const handleShowSentEmail: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault(); // Preventing the default behvaior

    // Cleaning the possible alerts from the screen
    setWrongLogIn(false);
    setInputError(false);
    setEmailSent(true);

    // Configuring the time that the element will be shown for
    setTimeout(() => {
      setEmailSent(false);
    }, 5000);
  };

  //  Function to open the sign in page
  const handleOpenSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push('/signIn');
  };

  // Function to get back to the main menu
  const handleBackMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push('/'); // Changing the url to the main one
  };

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-white p-40 text-black">
      <form
        className="relative flex w-full flex-col items-center rounded-3xl border border-black bg-green-300 px-8 py-16 sm:min-h-[500px] sm:w-auto sm:min-w-[400px]"
        onSubmit={handleLogIn}
      >
        <img
          src="/login.png"
          alt="log in icon"
          className="absolute right-2 top-2 w-20"
        />
        <button className="absolute left-5 top-5" onClick={handleBackMenu}>
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
          className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
          placeholder="Password"
          onChange={handleInputs}
          ref={refPasswordInput}
          required
        />
        <div className="mb-2 flex items-center gap-2 self-start">
          <input
            type="checkbox"
            id="showPasswordCheckbox"
            onClick={handlePasswordCheckbox}
            className="cursor-pointer hover:bg-black/20"
          />
          <label
            htmlFor="showPasswordCheckbox"
            className="cursor-pointer select-none text-black"
          >
            Show password
          </label>
        </div>
        <button
          className="mb-auto self-start text-sky-600 hover:underline"
          onClick={handleShowSentEmail}
        >
          Forgot my password
        </button>
        <div className="flex gap-5">
          <button
            type="submit"
            className="w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
          >
            Log in
          </button>
          <button
            className="w-[100px] rounded-2xl border border-white bg-sky-700 px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
            onClick={handleOpenSignIn}
          >
            Sign in
          </button>
        </div>
      </form>
      {wrongLogIn && (
        <div className="absolute right-14 top-10">
          <ErrorBox text="Incorrect username and/or password. Please try again."></ErrorBox>
        </div>
      )}
      {inputError && (
        <div className="absolute right-14 top-10">
          <ErrorBox text="Please fill the fields correctly"></ErrorBox>
        </div>
      )}
      {emailSent && (
        <div className="absolute right-14 top-10">
          <ConfirmationBox text="Email sent, please check your inbox."></ConfirmationBox>
        </div>
      )}
    </div>
  );
};

export default SignIn;
