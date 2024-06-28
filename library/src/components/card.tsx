import { userCtx } from '@/context/userContext';
import { Book } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useContext, useRef, useState } from 'react';
import { USER_ID_KEY } from './header';
import { bookCtx } from '@/context/booksContext';
import Price from './price';

type BookCard = Book & {
  handleClickCart: VoidFunction;
  isShowingCart: boolean;
};

const Card = ({
  name,
  category,
  price,
  author,
  image,
  handleClickCart,
  isShowingCart,
}: BookCard) => {
  const userContext = useContext(userCtx); // Getting the context
  const bookContext = useContext(bookCtx);
  const router = useRouter(); // Creating an instance of router
  const linkRef = useRef<HTMLAnchorElement>(null); // Creating a reference to a element
  const btnCartRef = useRef<HTMLButtonElement>(null); // Creating a reference to the Add to cart button
  const btnBuyNowRef = useRef<HTMLButtonElement>(null); // Creating a reference to the Buy now button
  const [isAddedToCart, setIsAddedToCart] = useState(false); // State variable to control if an item was added to the cart

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

  // Function to handle clicking on the author link
  const handleAuthorClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent div
    router.push(`/authors/search?name=${author.name}`);
  };

  // Function to handle clicking on the card
  const handleCardClick = () => {
    router.push(`/books/search?name=${name}`);
  };

  return (
    <div
      className="animate-fade-up relative flex min-w-[300px] cursor-pointer flex-col gap-1 rounded-3xl px-5 py-10 text-black"
      onClick={handleCardClick}
    >
      <img
        src={`${image}`}
        alt="Book image"
        className="mx-auto mb-4 h-[200px] w-2/4 bg-gray-400"
      />
      <h1 className="font-Barlow text-bold text-2xl">
        {name}
        <br />
        <a
          ref={linkRef}
          className="cursor-pointer text-lg hover:underline"
          onClick={handleAuthorClick}
        >
          {author.name}
        </a>
      </h1>
      <p>
        <span className="text-lg font-normal">Categories: </span>
        <span className="font-light">
          {category.map((item, index) => {
            if (index === category.length - 1) {
              return item;
            }
            return item + ' - ';
          })}
        </span>
      </p>
      <Price key={crypto.randomUUID()} price={price}></Price>
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
          <div
            className={`animate-jump-in absolute top-[20px] z-20 flex h-10 w-[162px] items-center justify-center rounded-2xl bg-black px-4 py-2 text-white`}
          >
            Added to cart
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
