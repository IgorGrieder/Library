'use client';
import Header from '@/components/header';
import { userCtx } from '@/context/userContext';
import { useContext } from 'react';

const Page = () => {
  const userContext = useContext(userCtx); // Getting the context

  return (
    <div className="min-h-screen bg-white text-black">
      <Header></Header>
      <div className="grid grid-cols-3 gap-2 sm:px-20 sm:py-10">
        <div className="col-span-2 grid grid-cols-1 gap-4 px-2 py-4">
          <h4 className="text-bold font-Barlow text-center text-3xl">
            Checkout
          </h4>
          <div className="mb-2 border-b border-green-500 px-3 py-5">
            <h4 className="text-bold font-Barlow text-xl">Address</h4>
            <h6 className="font-sans text-lg font-bold">
              Street:{' '}
              <span className="font-normal">
                {userContext?.user.address.street}
              </span>
            </h6>
          </div>
          <div className="mb-2 border-b border-green-500 px-3 py-5">
            <h4 className="text-bold font-Barlow text-xl">Payment method</h4>
          </div>
          <div className="border-b border-green-500 px-3 py-5">
            <h4 className="text-bold font-Barlow mb-2 text-xl">Order review</h4>
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
    </div>
  );
};

export default Page;
