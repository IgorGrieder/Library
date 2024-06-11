import { userCtx } from '@/context/userContext';
import { Book } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useContext, useRef } from 'react';

const Card = ({ name, category, price, author, image }: Book) => {
  const userContext = useContext(userCtx); // Getting the context
  const router = useRouter(); // Creating an instance of router
  const linkRef = useRef<HTMLAnchorElement>(null); // Creating a refference to a element
  const btnCartRef = useRef<HTMLButtonElement>(null); // Creating a refference to the Add to cart button
  const btnBuyNowRef = useRef<HTMLButtonElement>(null); // Creating a refference to the Buy now button

  // Function to open the specific page relate to the book
  const handleOpenPage = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === linkRef.current) {
      router.push(`/authors/search?name=${author.name}`);
    } else if (event.target === btnCartRef.current) {
      // If the user clicks on the Add to cart button it will just add the item to the user context
      if (userContext?.user.cartItems[name] === undefined) {
        // If the user haven`t added any quantity of the specific book
        userContext?.setUser({
          ...userContext.user,
          cartItems: { ...userContext.user.cartItems, [name]: 1 },
        });
      } else {
        const quantity = userContext.user.cartItems[name] + 1; // Getting the quantity of the book and incrementing it
        userContext.setUser({
          ...userContext.user,
          cartItems: { ...userContext.user.cartItems, [name]: quantity },
        });
      }
    } else if (event.target === btnBuyNowRef.current) {
      console.log('Btn buy now');
    } else {
      router.push(`/books/search?name=${name}`);
    }
  };

  return (
    <div
      className="flex cursor-pointer flex-col gap-1 rounded-3xl border border-black px-5 py-10 text-black"
      onClick={handleOpenPage}
    >
      <img
        src={`${image}`}
        alt="Book image"
        className="mx-auto mb-4 h-[200px] w-2/4 bg-gray-400"
      />
      <h1 className="font-Barlow text-bold text-2xl">
        {name}
        <br />{' '}
        <a
          ref={linkRef}
          className="cursor-pointer text-lg hover:underline"
          onClick={handleOpenPage}
        >
          {author.name}
        </a>
      </h1>
      <p>
        {' '}
        <span className="text-lg font-normal">Categorys: </span>
        <span className="font-light">
          {category.map((item, index) => {
            if (index === category.length - 1) {
              return item;
            }
            return item + ' - ';
          })}
        </span>
      </p>
      <h4 className="mb-5 font-semibold">
        Price:{' '}
        <span className="cursor-pointer font-light text-blue-600 hover:underline">
          ${price}
        </span>
      </h4>
      <div className="mt-auto flex justify-around">
        <button
          className="rounded-lg border border-green-400 px-4 py-2 hover:border-black hover:bg-green-500 hover:text-white"
          ref={btnCartRef}
        >
          Add to Cart
        </button>
        <button
          className="rounded-lg border border-black px-4 py-2 hover:bg-green-500 hover:text-black"
          ref={btnBuyNowRef}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};
export default Card;
