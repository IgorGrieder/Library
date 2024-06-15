import { userCtx } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import CartSideItems from './cartSideItems';
import { bookCtx } from '@/context/booksContext';
import { Book } from '@/types/types';

type Props = {
  handleCartClick: VoidFunction;
};

const CartSide = ({ handleCartClick }: Props) => {
  const userContext = useContext(userCtx); // GEtting the context
  const bookContext = useContext(bookCtx);
  const router = useRouter(); // Creating an instance of router

  // Function to redirect directly to the cart area
  const goToCart = () => {
    router.push('/cart');
  };

  // Function to find the relative book
  const findBook = (bookName: string): Book | undefined => {
    let foundBook = bookContext?.listBooks.find(
      (item) => item.name === bookName,
    );
    return foundBook;
  };

  return (
    <div className="fixed right-0 h-screen w-[250px] bg-green-400 px-4 py-5">
      <button className="fixed right-5 top-5" onClick={handleCartClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-6 text-black">
        <div className="border-b border-b-gray-600 pb-4">
          <h1 className="mb-2 text-center">Subtotal</h1>
          <h4 className="mb-4 text-center text-red-500">
            $
            {userContext?.user.shoppingValue
              ? parseFloat(userContext.user.shoppingValue) > 0
                ? userContext.user.shoppingValue
                : '0.00'
              : '0.00'}
          </h4>
          <button
            className="w-full rounded-2xl border border-black px-6 py-1 text-sm"
            onClick={goToCart}
          >
            Go to cart
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 py-4">
          {userContext?.user &&
          Object.keys(userContext?.user.cartItems).length > 0 ? (
            Object.keys(userContext.user.cartItems).map((item) => {
              let book = findBook(item);
              if (book) {
                return (
                  <CartSideItems
                    key={crypto.randomUUID()}
                    quantity={userContext.user.cartItems[book.name]}
                    name={book.name}
                    image={book.image}
                    price={book.price}
                  ></CartSideItems>
                );
              }
            })
          ) : (
            <div>No items in the cart</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSide;
