'use client';
import { Book } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useContext, useRef, useState } from 'react';
import { USER_ID_KEY } from './header';
import userContext, { userCtx } from '@/context/userContext';
import { bookCtx } from '@/context/booksContext';

type BookCard = Book & {
  handleClickCart: VoidFunction;
  isShowingCart: boolean;
};

const BookPage = ({
  name,
  category,
  price,
  author,
  image,
  handleClickCart,
  isShowingCart,
}: BookCard) => {
  const router = useRouter(); // Creating an instance of router
  const userContext = useContext(userCtx); // Getting the context
  const bookContext = useContext(bookCtx);
  const btnCartRef = useRef<HTMLButtonElement>(null); // Creating a reference to the Add to cart button
  const btnBuyNowRef = useRef<HTMLButtonElement>(null); // Creating a reference to the Buy now button
  const [isAddedToCart, setIsAddedToCart] = useState(false); // State variable to control if an item was added to the cart

  // Function to open the author page
  const handleOpenPage = () => {
    router.push(`/authors/search?name=${author.name}`);
  };

  // Function to make the logic of adding the books to the control hash
  const addItem = () => {
    if (!userContext) return; // in case userContext is actually null

    const { user, setUser } = userContext;

    // Update cartItems based on existing or new items
    const updatedCartItems = {
      ...user.cartItems,
      [name]:
        (user.cartItems[name] !== undefined ? user.cartItems[name] : 0) + 1, // Increment quantity or start with 1
    };

    const foundBook = bookContext?.listBooks.find((item) => item.name === name);
    let updatedShoppingValue = user.shoppingValue;

    if (foundBook) {
      // Update shoppingValue according to the new items added
      const currentShoppingValue = user.shoppingValue
        ? parseFloat(user.shoppingValue)
        : 0;
      updatedShoppingValue = (currentShoppingValue + foundBook.price).toFixed(
        2,
      ); // Keep two decimal places
    }

    // Update userContext.user with new cartItems and shopping value
    setUser({
      ...user,
      cartItems: updatedCartItems,
      shoppingValue: updatedShoppingValue,
    });

    // Update localStorage with updated user information
    localStorage.setItem(
      USER_ID_KEY,
      JSON.stringify({
        ...user,
        cartItems: updatedCartItems, // Store only necessary data
        shoppingValue: updatedShoppingValue,
      }),
    );
  };

  // Function to handle adding item to cart
  const handleAddToCart = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // Logic to add item to cart
    setIsAddedToCart(true);
    addItem();
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  // Function to handle buying item now
  const handleBuyNow = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent div
    addItem();
    router.push('/cart');
  };

  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <h1 className="font-Barlow mx-auto text-3xl">{name}</h1>
      <div className="m-5 w-60">
        <img src={`/${image}`} alt="" />
      </div>
      <h4 className="font-bold">
        by:{' '}
        <a
          className="cursor-pointer text-lg font-normal hover:underline"
          onClick={handleOpenPage}
        >
          {author.name}
        </a>
      </h4>
      <h4>
        {category.map((item, index) => {
          if (index === category.length - 1) {
            return item;
          }
          return item + ' - ';
        })}
      </h4>
      <h4 className="font-semibold">
        Price:{' '}
        <span className="cursor-pointer font-light text-blue-600 hover:underline">
          ${price}
        </span>
      </h4>
      <h4 className="font-Barlow w-full border-t border-gray-500 pt-2 font-bold">
        Summary
      </h4>
      <p className="max-w-[600px] text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque culpa at
        rerum, hic repudiandae modi soluta explicabo vero optio, necessitatibus
        perferendis, consequuntur voluptatem. Inventore aut dolorum, mollitia
        perferendis eius numquam?
      </p>
      <div className="mt-auto grid grid-cols-2 justify-around gap-5">
        <button
          className="rounded-lg border border-green-400 px-4 py-2 hover:border-black hover:bg-green-500 hover:text-white"
          ref={btnCartRef}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="rounded-lg border border-black bg-green-500 px-4 py-2 text-black hover:text-white"
          ref={btnBuyNowRef}
          onClick={handleBuyNow}
        >
          Buy now
        </button>
        {isAddedToCart && (
          <img
            src="/add.png"
            alt=""
            className={`fixed ${isShowingCart ? 'right-[280px]' : 'right-5'} animate-jump-in top-[120px] z-20 w-40`}
          />
        )}
      </div>
    </div>
  );
};

export default BookPage;
