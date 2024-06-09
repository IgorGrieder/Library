import { Book } from '@/types/types';
import { useRouter } from 'next/navigation';

const Card = ({ name, category, price, author, image }: Book) => {
  const router = useRouter(); // Creating an instance of router

  // Function to open the specific page relate to the book
  const handleOpenPage = () => {
    router.push(`/books/search?name=${name}`);
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
        <a className="cursor-pointer text-lg hover:underline">{author.name}</a>
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
      <h4 className="font-semibold">
        Price:{' '}
        <span className="cursor-pointer font-light text-blue-600 hover:underline">
          ${price}
        </span>
      </h4>
    </div>
  );
};
export default Card;
