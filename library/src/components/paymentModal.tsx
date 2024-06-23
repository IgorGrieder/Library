'use client';
import { userCtx } from '@/context/userContext';
import { Card } from '@/types/types';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import ErrorBox from './ErrorBox';
import axiosInstance from '@/utils/axios';

type Props = {
  hideModal: VoidFunction;
};

const PaymentModal = ({ hideModal }: Props) => {
  const [userInput, setUserInput] = useState<Card>({
    cvv: '',
    expDate: '',
    name: '',
    number: '',
  }); // State variable to control the current inputs of the user
  const [inputError, setInputError] = useState(false); // State variable to control possible errors
  const [requestError, setRequestError] = useState(false); // State variable to control possible request errors
  const userContext = useContext(userCtx); // Getting the context
  const controlKeys: string[] = []; // Array to control the missing fields

  // Function to handle chagens on the inputs
  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.target.name; // Getting the name of the event target input element
    setUserInput({
      // cloning the object and changing the info dinamically for the specific field
      ...userInput,
      [eTarget]: e.target.value,
    });
  };

  // Function to check if the inputs are filled
  const checkInputs = () => {
    const keys = Object.keys(userInput) as Array<keyof Card>;
    keys.forEach((key) => {
      const value = userInput[key];
      if (typeof value !== 'string' || value.length === 0) {
        controlKeys.push(key as string);
      }
    });

    return controlKeys;
  };

  // Fcuntion to clear the inputs
  const clearInputs = () => {
    setUserInput({
      cvv: '',
      expDate: '',
      name: '',
      number: '',
    });
  };

  // Function to handle the submit of the form
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the default submit behavior

    if (checkInputs().length === 0) {
      // If all the fields are filled correctly
      // Update user context if it's available
      if (userContext) {
        userContext.setUser({
          ...userContext.user,
          paymentMethod: [...userContext.user.paymentMethod, { ...userInput }],
        });
      }

      const requestData = {
        id: userContext?.user.id,
        ...userInput,
      };

      // Updating the database
      try {
        const result = await axiosInstance.patch('/cart/payment', requestData);

        if (result.data.found) {
          // In case it was a successful request to add a new address
          hideModal(); // Resetting the modal
        } else {
          setRequestError(true); // Showing that we had an error in the request
          clearInputs();
        }
      } catch (err) {
        console.log(err); // Log detailed error
        setRequestError(true); // Show request error to the user
      }
    } else {
      setInputError(true);
    }
  };

  // Function to handle the closing of the modal
  const handleCloseModal = () => {
    hideModal();
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60">
      <div className="relative w-[500px] rounded-xl border border-black bg-white p-5">
        <button className="absolute right-5" onClick={handleCloseModal}>
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="font-Barlow text-center text-xl">Add an address</h1>
        <p className="mt-2">
          Please complete the following steps to add a new address!
        </p>
        <form
          className="mx-auto mt-5 flex w-3/4 flex-col gap-2"
          onSubmit={handleForm}
        >
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="name"
            type="text"
            placeholder="Name..."
            required
            onChange={handleInputs}
            value={userInput.name ?? ''}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="number"
            type="text"
            placeholder="Number..."
            required
            onChange={handleInputs}
            value={userInput.number ?? ''}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="expDate"
            type="text"
            placeholder="expDate..."
            required
            onChange={handleInputs}
            value={userInput.expDate ?? ''}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="cvv"
            type="text"
            placeholder="CVV..."
            onChange={handleInputs}
            value={userInput.cvv ?? ''}
          />
          {requestError && (
            <ErrorBox text="We encountered an error processing your request, please try again"></ErrorBox>
          )}
          {inputError && (
            <ErrorBox
              text={`Please fill the fields correctly: ${controlKeys.join(', ')}`}
            ></ErrorBox>
          )}
          <button className="mx-auto w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
