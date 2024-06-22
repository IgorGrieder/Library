'use client';
import { userCtx } from '@/context/userContext';
import { UserLocation } from '@/types/types';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

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
  const [inputError, setInputError] = useState([]); // State variable to control possible errors
  const userContext = useContext(userCtx); // Getting the context

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
    const controlKeys: string[] = [];
    const keys = Object.keys(userInput) as Array<keyof UserLocation>;
    keys.forEach((key) => {
      const value = userInput[key];
      if (
        key !== 'complement' &&
        (typeof value !== 'string' || value.length === 0)
      ) {
        controlKeys.push(key as string);
      }
    });

    return controlKeys;
  };

  // Function to handle the submit of the form
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the default submit behavior

    if (checkInputs().length < 0) {
      userContext?.setUser({
        ...userContext.user,
        address: [...userContext.user.address, userInput],
      });
      hideModal(); // Reseting the modal
    } else {
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
            placeholder="Street..."
            required
            onChange={handleInputs}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="number"
            type="text"
            placeholder="Number..."
            required
            onChange={handleInputs}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="neighborhood"
            type="text"
            placeholder="Neighborhood..."
            required
            onChange={handleInputs}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="complement"
            type="text"
            placeholder="Complement..."
            onChange={handleInputs}
          />
          <input
            className="mb-5 w-full rounded-lg border border-black px-4 py-2 outline-none"
            name="country"
            type="text"
            placeholder="Country..."
            required
            onChange={handleInputs}
          />
          <button className="mx-auto w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
