import { Book } from '@/types/types';

const Card = ({ name, category, price, author, image }: Book) => {
  return (
    <div className="flex flex-col">
      <img src={image[0]} alt="Image of the book" />
      <h1>
        {name}
        <br /> <a>{author.name}</a> -{' '}
        <p>
          {category.map((item) => {
            return item + ' - ';
          })}
        </p>
      </h1>
      <h4>{price}</h4>
    </div>
  );
};
export default Card;
