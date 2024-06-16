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
    <div className="min-h-screen bg-white pt-[100px]">
      <Header handleCartClick={handleCartClick}></Header>
      <div
        className={`${isShowingCart ? 'grid-cols-5' : 'grid-cols-1'} relative grid`}
      >
        <div
          className={`grid grid-cols-3 gap-4 ${isShowingCart ? 'sm:mx-auto sm:pl-4' : 'sm:px-20'} sm:py-10 ${isShowingCart && 'col-span-4'}`}
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
