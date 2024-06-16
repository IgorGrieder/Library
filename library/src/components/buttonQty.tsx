import userContext, { userCtx } from '@/context/userContext';
import { USER_ID_KEY } from './header';
import { useContext } from 'react';
import { bookCtx } from '@/context/booksContext';

type Props = {
  icon: string;
  name: string;
};

const ButtonQty = ({ icon, name }: Props) => {
  const signal = icon === '+' ? true : false; // boolean variable to set the operation to be done
  const userContext = useContext(userCtx); // Getting the context
  const bookContext = useContext(bookCtx);

  // Function to remove properties from a object
  const removeProperty = (obj: { [key: string]: number }, prop: string) => {
    const { [prop]: _, ...rest } = obj; // using the obj destructuring to remove the desired property
    return rest;
  };

  // Function to find a book
  const findBook = (name: string) => {
    return bookContext?.listBooks.find((item) => item.name === name);
  };

  // Function to handle the click and make the changes
  const addItem = () => {
    if (!userContext) return; // in case userContext is actually null

    const { user, setUser } = userContext;

    if (!signal && user.cartItems[name] === 1) {
      // In case if the quantity is 1 and the minus button is pressed
      const updatedCartItems = removeProperty(user.cartItems, name);
      const book = findBook(name);

      if (book && user.shoppingValue) {
        const updatedShoppingValue = (
          parseFloat(user.shoppingValue) - book.price
        ).toFixed(2);

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
      }
      return;
    }

    // Update cartItems based on existing or new items
    const updatedCartItems = {
      ...user.cartItems,
      [name]: signal ? user.cartItems[name] + 1 : user.cartItems[name] - 1, // Increment or decrement the quantity
    };

    const foundBook = bookContext?.listBooks.find((item) => item.name === name);
    let updatedShoppingValue = user.shoppingValue;

    if (foundBook) {
      // Update shoppingValue according to the new items added
      const currentShoppingValue = user.shoppingValue
        ? parseFloat(user.shoppingValue)
        : 0;
      updatedShoppingValue = signal
        ? (currentShoppingValue + foundBook.price).toFixed(2) // Keep two decimal places
        : (currentShoppingValue - foundBook.price).toFixed(2);
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

  return (
    <button
      className="rounded-xl border border-white px-1"
      onClick={() => addItem()}
    >
      {icon}
    </button>
  );
};

export default ButtonQty;
