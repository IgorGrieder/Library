'use client';
import Header from '@/components/header';
import PaymentCard from '@/components/paymentCard';
import { userCtx } from '@/context/userContext';
import { Card } from '@/types/types';
import { useContext, useState } from 'react';

const Page = () => {
  const userContext = useContext(userCtx); // Getting the context
  const [paymentCard, setPaymentCard] = useState<Card | null>(null); // State varible to control the card currently being used to make the payment
  const [isFinishedLocalStorage, setIsFinishedLocalStorage] = useState(false); // State variable to control if the local storage load is done
  // isFinishedLocalStorage is basically a flag to prevent the items to pre load during a short period of time without the localStorage information

  return (
    <div className="min-h-screen bg-white text-black">
      <Header setIsFinishedLocalStorage={setIsFinishedLocalStorage}></Header>
      {isFinishedLocalStorage && (
        <div className="grid grid-cols-3 gap-2 sm:px-20 sm:py-10">
          <div className="col-span-2 grid grid-cols-1 gap-4 px-2 py-4">
            <h4 className="text-bold font-Barlow text-center text-3xl">
              Checkout
            </h4>
            {userContext?.user.user ? (
              <>
                <div className="mb-2 border-b border-green-500 px-3 py-5">
                  <h4 className="text-bold font-Barlow mb-2 text-2xl">
                    Address
                  </h4>
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
                    <>
                      <h4 className="mb-4">Please choose a card</h4>
                      <h4 className="mb-4">Cards registered</h4>
                      {(userContext?.user.paymentMethod.length ?? 0) > 0 &&
                        userContext?.user.paymentMethod.map((item) => {
                          return (
                            <PaymentCard
                              key={crypto.randomUUID()}
                              selectedCard={paymentCard}
                              cvv={item.cvv}
                              name={item.name}
                              expDate={item.expDate}
                              number={item.number}
                              setPaymentCard={setPaymentCard}
                            ></PaymentCard>
                          );
                        })}
                    </>
                  ) : (
                    <PaymentCard
                      key={crypto.randomUUID()}
                      selectedCard={paymentCard}
                      cvv={paymentCard.cvv}
                      name={paymentCard.name}
                      number={paymentCard.number}
                      expDate={paymentCard.expDate}
                      setPaymentCard={setPaymentCard}
                    ></PaymentCard>
                  )}
                  <button className="mt-4 text-green-400 hover:text-black hover:underline">
                    Add a card
                  </button>
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
      )}
    </div>
  );
};

export default Page;
