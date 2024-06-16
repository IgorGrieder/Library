'use client';
import CartSideItems from '@/components/cartSideItems';
import Header from '@/components/header';
import PaymentCard from '@/components/paymentCard';
import { bookCtx } from '@/context/booksContext';
import { userCtx } from '@/context/userContext';
import { Book, Card } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const Page = () => {
  const userContext = useContext(userCtx); // Getting the context
  const bookContext = useContext(bookCtx);
  const [paymentCard, setPaymentCard] = useState<Card | null>(null); // State varible to control the card currently being used to make the payment
  const [isFinishedLocalStorage, setIsFinishedLocalStorage] = useState(false); // State variable to control if the local storage load is done
  const [showAlert, setShowAlert] = useState(false); // State variable to show that teh cart is empty
  // isFinishedLocalStorage is basically a flag to prevent the items to pre load during a short period of time without the localStorage information
  const router = useRouter(); // Creating an instance of router

  // Function to find the relative book
  const findBook = (bookName: string): Book | undefined => {
    let foundBook = bookContext?.listBooks.find(
      (item) => item.name === bookName,
    );
    return foundBook;
  };

  // Function to simulate a order being done
  const handleFakeProcedure = () => {
    if (!userContext) return;

    if (Object.keys(userContext?.user.cartItems).length !== 0) {
      router.push('/checkout');
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[100px] text-black">
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
                className="rounded-lg border border-black bg-green-500 px-4 py-2 text-black hover:text-white"
                onClick={handleFakeProcedure}
              >
                Process order
              </button>
              {showAlert && (
                <div
                  className="absolute flex h-[42px] w-[250px] items-center justify-center border border-black py-4"
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
