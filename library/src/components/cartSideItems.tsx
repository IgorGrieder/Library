import { useContext } from 'react';
import ButtonQty from './buttonQty';
import Price from './price';
import { bookCtx } from '@/context/booksContext';
import { userCtx } from '@/context/userContext';
import { USER_ID_KEY } from './header';

type BookCart = {
  quantity: number;
  name: string;
  price: number;
  image: string;
  isCheckout?: boolean;
};

const CartSideItems = ({
  price,
  image,
  name,
  quantity,
  isCheckout,
}: BookCart) => {
  const bookContext = useContext(bookCtx); // Getting the context
  const userContext = useContext(userCtx);
  const isCart = window.location.href.includes('cart') ? true : false; //  Variable to identify where the component is to set margin-top

  // Function to remove properties from a object
  const removeProperty = (obj: { [key: string]: number }, prop: string) => {
    const { [prop]: _, ...rest } = obj; // using the obj destructuring to remove the desired property
    return rest;
  };

  // Function to find a book
  const findBook = (name: string) => {
    return bookContext?.listBooks.find((item) => item.name === name);
  };

  // Function to handle the remove button
  const hanldeRemoveItem = () => {
    if (userContext?.user) {
      // In case if the quantity is 1 and the minus button is pressed
      const updatedCartItems = removeProperty(
        userContext?.user.cartItems,
        name,
      );
      const book = findBook(name);

      if (book && userContext?.user.shoppingValue) {
        const updatedShoppingValue = (
          parseFloat(userContext.user.shoppingValue) -
          book.price * userContext.user.cartItems[book.name]
        ).toFixed(2);

        // Update userContext.user with new cartItems and shopping value
        userContext.setUser({
          ...userContext.user,
          cartItems: updatedCartItems,
          shoppingValue: updatedShoppingValue,
        });

        // Update localStorage with updated user information
        localStorage.setItem(
          USER_ID_KEY,
          JSON.stringify({
            ...userContext.user,
            cartItems: updatedCartItems, // Store only necessary data
            shoppingValue: updatedShoppingValue,
          }),
        );
      }
    }
  };

  return (
    <div className="animate-fade-left flex h-full flex-col items-center gap-1 py-4 text-black">
      <img src={`/${image}`} alt="" className="mb-2 w-[80px]" />
      <div className="font-barlow text-center text-xl">{name}</div>
      <Price price={price}></Price>
      <div
        className="mt-auto flex items-center gap-2"
        style={{ marginTop: isCart ? 'auto' : '0px' }}
      >
        <div>Qty: {quantity}</div>
        <div className="flex gap-2">
          <ButtonQty
            key={crypto.randomUUID()}
            icon="-"
            name={name}
            isCheckout={isCheckout}
          ></ButtonQty>
          <ButtonQty
            key={crypto.randomUUID()}
            icon="+"
            name={name}
            isCheckout={isCheckout}
          ></ButtonQty>
          <button onClick={hanldeRemoveItem} className="hover:underline">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideItems;
