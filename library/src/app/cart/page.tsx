'use client';
import Header from '@/components/header';
import PaymentCard from '@/components/paymentCard';
import { userCtx } from '@/context/userContext';
import { Card } from '@/types/types';
import { useContext, useState } from 'react';

const Page = () => {
  const userContext = useContext(userCtx); // Getting the context
  const [paymentCard, setPaymentCard] = useState<Card | null>(null); // State varible to control the card currently being used to make the payment

  return (
    <div className="min-h-screen bg-white text-black">
      <Header></Header>
      <div className="grid grid-cols-3 gap-2 sm:px-20 sm:py-10">
        <div className="col-span-2 grid grid-cols-1 gap-4 px-2 py-4">
          <h4 className="text-bold font-Barlow text-center text-3xl">
            Checkout
          </h4>
          {userContext?.user.user ? (
            <>
              <div className="mb-2 border-b border-green-500 px-3 py-5">
                <h4 className="text-bold font-Barlow mb-2 text-2xl">Address</h4>
                <h6 className="font-sans text-base font-bold">
                  Street location:{' '}
                  <span className="font-normal">
                    {userContext?.user.address.street} -{' '}
                    {userContext?.user.address.number},{' '}
                    {userContext?.user.address.neighborhood},{' '}
                    {userContext?.user.address.complement}
                  </span>
                </h6>
                <h6 className="font-sans text-base font-bold">
                  Country:{' '}
                  <span className="font-normal">
                    {userContext?.user.address.country}
                  </span>
                </h6>
              </div>
              <div className="mb-2 border-b border-green-500 px-3 py-5">
                <h4 className="text-bold font-Barlow mb-2 text-2xl">
                  Payment method
                </h4>
                {paymentCard === null ? (
                  (userContext?.user.paymentMethod.length ?? 0) > 0 &&
                  userContext?.user.paymentMethod.map((item) => {
                    return (
                      <PaymentCard
                        key={crypto.randomUUID()}
                        cvv={item.cvv}
                        name={item.name}
                        expDate={item.expDate}
                        number={item.number}
                        setPaymentCard={setPaymentCard}
                      ></PaymentCard>
                    );
                  })
                ) : (
                  <PaymentCard
                    key={crypto.randomUUID()}
                    cvv={paymentCard.cvv}
                    name={paymentCard.name}
                    number={paymentCard.number}
                    expDate={paymentCard.expDate}
                    setPaymentCard={setPaymentCard}
                  ></PaymentCard>
                )}
              </div>
            </>
          ) : (
            <h6>Please log in to finish the setup</h6>
          )}

          <div className="border-b border-green-500 px-3 py-5">
            <h4 className="text-bold font-Barlow mb-2 text-2xl">
              Order review
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {userContext?.user &&
              Object.keys(userContext?.user.cartItems).length > 0 ? (
                Object.keys(userContext.user.cartItems).map((item) => {
                  return <div key={crypto.randomUUID()}>{item}</div>; // Assuming each item has an id and a name
                })
              ) : (
                <div>No items in the cart</div>
              )}
            </div>
          </div>
        </div>
        <div className="border border-red-700 px-2 py-4">
          {
            // Option to end the buy will appear here
          }
        </div>
      </div>
      <button
        className="bg-green-400 text-black"
        onClick={() => console.log(paymentCard)}
      >
        Show current card
      </button>
    </div>
  );
};

export default Page;
