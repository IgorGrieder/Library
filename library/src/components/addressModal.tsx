'use client';
import { userCtx } from '@/context/userContext';
import { UserLocation } from '@/types/types';
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

const AddressModal = ({ hideModal }: Props) => {
  const [userInput, setUserInput] = useState<UserLocation>({
    street: '',
    number: '',
    neighborhood: '',
    country: '',
    complement: '',
  }); // State variable to control the current inputs of the user
  const [inputError, setInputError] = useState(false); // State variable to control possible errors
  const [requestError, setRequestError] = useState(false); // State variable to control possible request errors
  const userContext = useContext(userCtx); // Getting the context
  const controlKeys: string[] = []; // Array to control de fields
  const refStreet = useRef(null); // Ref for the street input
  const refCountry = useRef(null); // Ref for the Country input
  const refNumber = useRef(null); // Ref for the Number input
  const refNeighborhood = useRef(null); // Ref for the Neighborhood input
  const refComplement = useRef(null); // Ref for the Complement input
  const refs: Record<string, RefObject<HTMLInputElement>> = {
    street: refStreet,
    country: refCountry,
    number: refNumber,
    complement: refComplement,
    neighborhood: refNeighborhood,
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

  // Function to check the stret
  const isValidStreet = (street: string) => {
    return /^[a-zA-Z0-9\s.,'-]+$/.test(street);
  };

  // Function to check the complement
  const isValidComplement = (complement: string) => {
    return /^[a-zA-Z0-9\s.,'-]*$/.test(complement);
  };

  // Function to check the country
  const isValidCountry = (country: string) => {
    return /^[a-zA-Z\s-]+$/.test(country);
  };

  // Function to check the number
  const isValidNumber = (number: string) => {
    return /^[0-9\s-]+$/.test(number);
  };

  // Function to check the neighborgood
  const isValidNeighborhood = (neighborhood: string) => {
    return /^[a-zA-Z0-9\s.,'-]*$/.test(neighborhood);
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
    const keys = Object.keys(userInput) as Array<keyof UserLocation>;
    keys.forEach((key) => {
      const value = userInput[key] ?? '';
      if (key === 'street' && !isValidStreet(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'country' && !isValidCountry(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'neighborhood' && !isValidNeighborhood(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'number' && !isValidNumber(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
      if (key === 'complement' && !isValidComplement(value)) {
        controlKeys.push(key);
        highlightInputs(key);
      }
    });

    return controlKeys;
  };

  // Fcuntion to clear the inputs
  const clearInputs = () => {
    setUserInput({
      street: '',
      number: '',
      neighborhood: '',
      country: '',
      complement: '',
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
          address: [...userContext.user.address, { ...userInput }],
        });
        // Updating in the local storage
        localStorage.setItem(
          USER_ID_KEY,
          JSON.stringify({
            ...userContext.user,
            address: [...userContext.user.address, { ...userInput }],
          }),
        );
      }

      const requestData = {
        id: userContext?.user.id,
        ...userInput,
      };

      // Updating the database
      try {
        const result = await axiosInstance.patch('/cart/address', requestData);

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
            name="street"
            type="text"
            placeholder="Enter your street address"
            required
            onChange={handleInputs}
            value={userInput.street ?? ''}
            ref={refStreet}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="number"
            type="text"
            placeholder="Enter your house/building number"
            required
            onChange={handleInputs}
            value={userInput.number ?? ''}
            ref={refNumber}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="neighborhood"
            type="text"
            placeholder="Enter your neighborhood or district"
            required
            onChange={handleInputs}
            value={userInput.neighborhood ?? ''}
            ref={refNeighborhood}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="complement"
            type="text"
            placeholder="Enter any additional address details"
            onChange={handleInputs}
            value={userInput.complement ?? ''}
            ref={refComplement}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="country"
            type="text"
            placeholder="Enter your country"
            required
            onChange={handleInputs}
            value={userInput.country ?? ''}
            ref={refCountry}
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
  );
};

export default AddressModal;
