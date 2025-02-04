'use client';
import Card from '@/components/card';
import CartSide from '@/components/cartSide';
import Header from '@/components/header';
import { bookCtx } from '@/context/booksContext';
import { useContext, useState } from 'react';

const Home = () => {
  const bookContext = useContext(bookCtx);
  const [isShowingCart, setIsShowingCart] = useState(false); // State variable to control if the cart box is showing or not

  // Function to swap cart showing
  const handleCartClick = () => {
    setIsShowingCart(!isShowingCart);
  };

  return (
    <div className="min-h-screen bg-white pt-[112px]">
      <Header handleCartClick={handleCartClick}></Header>
      <div className="animate-flip-up grid grid-cols-3 px-10">
        <img src="sapiens.png" alt="" className="col-span-2 mx-auto w-3/4" />
        <h1 className="font-Libre my-auto text-center text-6xl font-thin text-black">
          The best place to find the best books!
        </h1>
      </div>
      <div
        className={`${isShowingCart ? 'grid-cols-5' : 'grid-cols-1'} relative grid`}
      >
        <div
          className={`grid grid-cols-3 gap-4 ${isShowingCart ? 'sm:mx-auto sm:pl-4' : 'sm:px-20'} ${isShowingCart && 'col-span-4'}`}
        >
          {bookContext?.listBooks.map((item) => {
            return (
              <Card
                key={crypto.randomUUID()}
                _id={item._id}
                isShowingCart={isShowingCart}
                handleClickCart={handleCartClick}
                image={item.image[0]}
                author={item.author}
                price={item.price}
                category={item.category}
                name={item.name}
              ></Card>
            );
          })}
        </div>
        {isShowingCart && (
          <CartSide
            handleCartClick={handleCartClick}
            key={crypto.randomUUID()}
          ></CartSide>
        )}
      </div>
    </div>
  );
};

export default Home;
