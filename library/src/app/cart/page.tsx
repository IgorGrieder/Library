'use client';
import AddressModal from '@/components/addressModal';
import CartSideItems from '@/components/cartSideItems';
import ErrorBox from '@/components/ErrorBox';
import Header from '@/components/header';
import LocationSection from '@/components/LocationSection';
import PaymentCard from '@/components/paymentCard';
import PaymentModal from '@/components/paymentModal';
import { bookCtx } from '@/context/booksContext';
import { userCtx } from '@/context/userContext';
import { Book, Card, UserLocation } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const Page = () => {
  const userContext = useContext(userCtx); // Getting the context
  const bookContext = useContext(bookCtx);
  const [paymentCard, setPaymentCard] = useState<Card | null>(null); // State varible to control the card currently being used to make the payment
  const [location, setLocation] = useState<UserLocation | null>(null); // State varible to control the address currently being used to make the delivery
  const [isFinishedLocalStorage, setIsFinishedLocalStorage] = useState(false); // State variable to control if the local storage load is done
  // isFinishedLocalStorage is basically a flag to prevent the items to pre load during a short period of time without the localStorage information
  const [showAlert, setShowAlert] = useState(false); // State variable to show that teh cart is empty
  const [showModalAddress, setShowModalAddress] = useState(false); // State variable to control if the address modal is going to be shown
  const [showModalPayment, setShowModalPayment] = useState(false); // State variable to control if the payment modal is going to be shown
  const router = useRouter(); // Creating an instance of router
  const isDisabled = location === null || paymentCard === null; // Flag to enbale and disable the button

  // Function to find the relative book
  const findBook = (bookName: string): Book | undefined => {
    let foundBook = bookContext?.listBooks.find(
      (item) => item.name === bookName,
    );
    return foundBook;
  };

  // Function to simulate a order being done
  const handleFakeProcedure = () => {
    if (userContext?.user.id === null || !userContext) return;

    if (Object.keys(userContext?.user.cartItems).length !== 0) {
      router.push('/checkout');
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  // Function to hide the address modal
  const hideModalAddress = () => {
    setShowModalAddress(false);
  };

  // Function to hide the payment modal
  const hideModalPayment = () => {
    setShowModalPayment(false);
  };

  // Function to show the modal
  const handleShowModalAddress = () => {
    setShowModalAddress(true);
  };

  // Function to show the modal
  const handleShowPaymentAddress = () => {
    setShowModalPayment(true);
  };

  return (
    <div className="min-h-screen bg-white pt-[100px] text-black">
      <Header setIsFinishedLocalStorage={setIsFinishedLocalStorage}></Header>
      {showModalAddress && (
        <AddressModal hideModal={hideModalAddress}></AddressModal>
      )}
      {showModalPayment && (
        <PaymentModal hideModal={hideModalPayment}></PaymentModal>
      )}
      {isFinishedLocalStorage && (
        <div className="grid grid-cols-3 gap-2 sm:px-20 sm:py-10">
          <div className="col-span-2 grid grid-cols-1 gap-4 px-2 py-4">
            <div className="mx-auto mb-5 flex items-center gap-5">
              <h4 className="text-bold font-Barlow text-center text-3xl">
                Checkout
              </h4>
              <img src="/order.png" alt="" className="w-36" />
            </div>
            {userContext?.user.user ? (
              <>
                <div className="mb-2 border-b border-green-500 px-3 py-5">
                  <div className="mx-auto mb-5 flex items-center gap-5">
                    <h4 className="text-bold font-Barlow mb-2 text-2xl">
                      Address
                    </h4>
                    <img src="/checkout.png" alt="" className="w-20" />
                  </div>
                  {location === null ? (
                    <>
                      <ErrorBox text="Please select a address"></ErrorBox>
                      <h4 className="mb-4">
                        Currently registered addresses{' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="ml-2 inline-block size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                          />
                        </svg>
                      </h4>
                      {userContext?.user.address.map((item) => {
                        return (
                          <LocationSection
                            key={crypto.randomUUID()}
                            address={location}
                            setAddress={setLocation}
                            complement={item.complement}
                            country={item.country}
                            street={item.street}
                            number={item.number}
                            neighborhood={item.neighborhood}
                          ></LocationSection>
                        );
                      })}
                    </>
                  ) : (
                    <LocationSection
                      key={crypto.randomUUID()}
                      address={location}
                      setAddress={setLocation}
                      complement={location.complement}
                      country={location.country}
                      street={location.street}
                      number={location.number}
                      neighborhood={location.neighborhood}
                    ></LocationSection>
                  )}
                  <button
                    className="mt-4 text-green-400 hover:text-black hover:underline"
                    onClick={handleShowModalAddress}
                  >
                    Add a address
                  </button>
                </div>
                <div className="mb-2 border-b border-green-500 px-3 py-5">
                  <div className="mb-5 flex items-center gap-5">
                    <h4 className="text-bold font-Barlow mb-2 text-2xl">
                      Payment method
                    </h4>
                    <img src="/creditCard.png" alt="" className="w-20" />
                  </div>
                  {paymentCard === null ? (
                    <>
                      <ErrorBox text="Please select a card"></ErrorBox>
                      <h4 className="mb-4">
                        Currently registered cards{' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="ml-2 inline-block size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                          />
                        </svg>
                      </h4>
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
                  <button
                    className="mt-4 text-green-400 hover:text-black hover:underline"
                    onClick={handleShowPaymentAddress}
                  >
                    Add a card
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <ErrorBox text="Please log in to finish the checkout"></ErrorBox>
              </div>
            )}

            <div className="px-3 py-5">
              <h4 className="text-bold font-Barlow mb-2 text-2xl">
                Order review
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {userContext?.user &&
                Object.keys(userContext?.user.cartItems).length > 0 ? (
                  Object.keys(userContext.user.cartItems).map((item) => {
                    const book = findBook(item);
                    if (book) {
                      return (
                        <div
                          className="border-b border-gray-600 pb-2"
                          key={crypto.randomUUID()}
                        >
                          <CartSideItems
                            isCheckout={true}
                            image={book?.image}
                            name={book.name}
                            price={book.price}
                            quantity={userContext.user.cartItems[book.name]}
                            key={crypto.randomUUID()}
                          ></CartSideItems>
                        </div>
                      ); // Assuming each item has an id and a name
                    }
                  })
                ) : (
                  <div> No items in the current cart</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center px-2 py-4">
            <h1 className="mb-2 text-center text-2xl">Subtotal</h1>
            <h4 className="mb-4 text-center text-red-500">
              $
              {userContext?.user.shoppingValue
                ? parseFloat(userContext.user.shoppingValue) > 0
                  ? userContext.user.shoppingValue
                  : '0.00'
                : '0.00'}
            </h4>
            <div className="relative">
              <button
                className={`rounded-lg border border-black bg-green-500 px-4 py-2 text-black ${!isDisabled && 'hover:text-white'}`}
                onClick={handleFakeProcedure}
                disabled={isDisabled}
              >
                Process order
              </button>
              {showAlert && (
                <div
                  className="absolute z-10 flex h-[42px] w-[250px] items-center justify-center border border-black bg-white py-4"
                  style={{
                    bottom: 'calc(50% - 21px)',
                    right: 'calc(100% + 40px)',
                  }}
                >
                  Please add itens to your cart
                  <div className="absolute left-[244px] rotate-90 border-b-[8px] border-l-[8px] border-r-[8px] border-b-black border-l-transparent border-r-transparent bg-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
