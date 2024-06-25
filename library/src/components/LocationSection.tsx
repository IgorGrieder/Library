import { UserLocation } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

type State = null | UserLocation;

type Props = UserLocation & {
  setAddress: Dispatch<SetStateAction<State>>;
  address: UserLocation | null;
};

const LocationSection = ({
  setAddress,
  address,
  street,
  neighborhood,
  complement,
  country,
  number,
}: Props) => {
  // Function to remove the current address selected
  const handleRemoveAddress = () => {
    setAddress(null);
  };

  // Function to select the current card
  const handleClickCard = () => {
    setAddress({ street, complement, country, neighborhood, number });
  };

  return (
    <div className="mt-2 flex w-3/4 cursor-pointer items-center gap-4 border border-black px-4 py-2">
      <button onClick={handleClickCard} className="flex items-center gap-4">
        <div
          className={`size-6 rounded-full ${address?.number === number ? `bg-green-500` : `border border-black`}`}
        ></div>
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
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
          />
        </svg>
        <span className="font-Barlow font-bold">
          Street:{' '}
          <span className="font-sans font-normal">
            {street} {number}, {complement} {neighborhood}
          </span>
        </span>
        <span className="font-Barlow font-bold">
          Country: <span className="font-sans font-normal">{country}</span>
        </span>
      </button>
      <button className="ml-auto text-red-500" onClick={handleRemoveAddress}>
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
    </div>
  );
};

export default LocationSection;
