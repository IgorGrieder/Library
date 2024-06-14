import { Card } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

type State = null | Card;

type CardToPay = Card & {
  setPaymentCard: Dispatch<SetStateAction<State>>;
  selectedCard: Card | null;
};

const PaymentCard = ({
  number,
  cvv,
  expDate,
  name,
  setPaymentCard,
  selectedCard,
}: CardToPay) => {
  // Function to format the number of the card
  const formatNum = (number: string): string => {
    let formNum = '';
    for (let i = 0; i < number.length; i++) {
      formNum += number[i];
      if (i === 3 || i === 7 || i === 11) {
        formNum += ' ';
      }
    }
    return formNum;
  };

  // Function to set the card as the current payment one
  const handleClickCard = () => {
    setPaymentCard({ name, cvv, expDate, number });
  };

  // Function to remove the current selected card
  const handleRemoveCard = () => {
    setPaymentCard(null);
  };

  return (
    <div className="flex w-3/4 cursor-pointer items-center gap-4 border border-black px-4 py-2">
      <button onClick={handleClickCard} className="flex gap-4">
        <div
          className={`size-6 rounded-full ${selectedCard?.number === number ? `bg-green-500` : `border border-black`}`}
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
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
        <span>{number && formatNum(number)}</span>
        <span>{name}</span>
      </button>
      <button className="ml-auto text-red-500" onClick={handleRemoveCard}>
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

export default PaymentCard;
