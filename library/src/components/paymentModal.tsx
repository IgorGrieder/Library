'use client';
import { userCtx } from '@/context/userContext';
import { Card } from '@/types/types';
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import ErrorBox from './ErrorBox';
import axiosInstance from '@/utils/axios';
import { USER_ID_KEY } from './header';

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
  const refNumber = useRef(null); // Ref for the Number input
  const refName = useRef(null); // Ref for the Name input
  const refExpDate = useRef(null); // Ref for the ExpDate input
  const refCvv = useRef(null); // Ref for the Cvv input
  const refs: Record<string, RefObject<HTMLInputElement>> = {
    number: refNumber,
    cvv: refCvv,
    expDate: refExpDate,
    name: refName,
  }; // Map for the respective refferences

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

  // Function to check the card number
  const isValidCardNumber = (cardNumber: string) => {
    // Remove any spaces or dashes from the card number input
    cardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');

    // Check if the card number matches the pattern for 16-digit numbers
    return /^\d{16}$/.test(cardNumber);
  };

  // Function to check the expDate
  const isValidExpirationDate = (expDate: string) => {
    // Check if the expiration date matches the MM/YYYY pattern
    return /^(0[1-9]|1[0-2])\/\d{4}$/.test(expDate);
  };

  // Function to check the CVV
  const isValidCVV = (cvv: string) => {
    // Check if the CVV matches the pattern for 3 or 4 digits
    return /^\d{3,4}$/.test(cvv);
  };

  // Function to check the name
  const isValidCardholderName = (name: string) => {
    // Check if the cardholder name matches alphanumeric and space pattern
    return /^[a-zA-Z0-9 ]+$/.test(name);
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

  // Function to check if the inputs are filled
  const checkInputs = () => {
    const keys = Object.keys(userInput) as Array<keyof Card>;
    keys.forEach((key) => {
      const value = userInput[key] ?? '';
      if (key === 'number' && !isValidCardNumber(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'cvv' && !isValidCVV(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'name' && !isValidCardholderName(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'expDate' && !isValidExpirationDate(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
    });

    return controlKeys;
  };

  // Fcuntion to clear the inputs
  const clearInputs = () => {
    setUserInput((prevUserInput) => ({
      cvv: '',
      expDate: '',
      name: '',
      number: '',
    }));
  };

  // Function to handle the submit of the form
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the default submit behavior
    const inputsLenght = checkInputs();
    if (inputsLenght.length === 0) {
      // If all the fields are filled correctly
      // Update user context if it's available
      if (userContext) {
        userContext.setUser({
          ...userContext.user,
          paymentMethod: [...userContext.user.paymentMethod, { ...userInput }],
        });
        // Updating in the local storage
        localStorage.setItem(
          USER_ID_KEY,
          JSON.stringify({
            ...userContext.user,
            paymentMethod: [
              ...userContext.user.paymentMethod,
              { ...userInput },
            ],
          }),
        );
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
      <div className="relative pl-[40px] pt-[34px]">
        <img
          src="/modal2.png"
          alt=""
          className="absolute left-0 top-0 z-10 w-20 rounded-xl"
        />
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
          <h1 className="font-Barlow text-center text-xl">Add a card</h1>
          <p className="mt-2">
            Please complete the following steps to add a new payment method!
          </p>
          <form
            className="mx-auto mt-5 flex w-3/4 flex-col gap-2"
            onSubmit={handleForm}
          >
            <input
              className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
              name="name"
              type="text"
              placeholder="Enter cardholder name"
              required
              onChange={handleInputs}
              value={userInput.name ?? ''}
              ref={refName}
            />
            <input
              className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
              name="number"
              type="text"
              placeholder="Enter your card number"
              required
              onChange={handleInputs}
              value={userInput.number ?? ''}
              ref={refNumber}
            />
            <input
              className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
              name="expDate"
              type="text"
              placeholder="Enter expiration date (MM/YYYY)"
              required
              onChange={handleInputs}
              value={userInput.expDate ?? ''}
              ref={refExpDate}
            />
            <input
              className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
              name="cvv"
              type="text"
              placeholder="Enter CVV (Card Verification Value)"
              onChange={handleInputs}
              value={userInput.cvv ?? ''}
              ref={refCvv}
            />
            {requestError && (
              <div className="flex justify-center">
                <ErrorBox text="We encountered an error processing your request, please try again"></ErrorBox>
              </div>
            )}
            {inputError && (
              <div className="flex justify-center">
                <ErrorBox text={`Please fill the fields correctly`}></ErrorBox>
              </div>
            )}
            <button className="mx-auto w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
