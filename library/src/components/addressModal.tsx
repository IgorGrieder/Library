import { userCtx } from '@/context/userContext';
import { UserLocation } from '@/types/types';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

const AddressModal = () => {
  const [userInput, setUserInput] = useState<UserLocation>({
    street: '',
    number: '',
    neighborhood: '',
    country: '',
    complement: '',
  }); // State variable to control the current inputs of the user
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

  // Function to handle the submit of the form
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing the default submit behavior
    userContext?.setUser({
      ...userContext.user,
      address: [...userContext.user.address, userInput],
    });
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
      <div className="w-[400px] rounded-xl border border-black bg-white p-5">
        <h1 className="font-Barlow text-center text-xl">Add an address</h1>
        <form className="mt-3 flex flex-col gap-2" onSubmit={handleForm}>
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
          <button
            type="submit"
            className="mx-auto w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddressModal;
