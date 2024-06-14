import { Card } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

type State = null | Card;

type CardToPay = Card & { setPaymentCard: Dispatch<SetStateAction<State>> };

const PaymentCard = ({
  number,
  cvv,
  expDate,
  name,
  setPaymentCard,
}: CardToPay) => {
  // Function to set the card as the current payment one
  const handleClickCard = () => {
    setPaymentCard({ name, cvv, expDate, number });
  };

  return (
    <div
      className="cursor-pointer border border-black px-4 py-2"
      onClick={handleClickCard}
    >
      <span>{number}</span>
      <span>{name}</span>
    </div>
  );
};

export default PaymentCard;
