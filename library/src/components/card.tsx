import { Author } from '@/types/types';

type Props = {
  name: string;
  category: string[];
  price: string;
  author: Author;
  image: string[];
};

const Card = ({ name, category, price, author, image }: Props) => {
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
