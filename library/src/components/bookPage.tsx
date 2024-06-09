import { Book } from '@/types/types';

const BookPage = ({ name, category, price, author, image }: Book) => {
  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <h1 className="font-Barlow mx-auto text-3xl">{name}</h1>
      <div className="h-80 w-96 bg-gray-500"></div>
      <h4 className="font-bold">
        by:{' '}
        <a className="cursor-pointer text-lg font-normal hover:underline">
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
    </div>
  );
};

export default BookPage;
