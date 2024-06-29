import { Author } from '@/types/types';
import { useRouter } from 'next/navigation';

const AuthorPage = ({ name, age, image, nationality, books }: Author) => {
  const ageDisplay = age === 0 ? '' : ` - ${age} years old`; // Setting the logic to display the age of the Author (if he`s dead or not)
  const router = useRouter(); // Creating an instance of router

  // Function to handle opening the specific book page
  const handleOpenPage = (bookName: string) => {
    router.push(`/books/search?name=${bookName}`);
  };

  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <h1 className="font-Barlow mx-auto text-3xl">
        {name}
        {ageDisplay}
      </h1>
      <div className="m-5 w-60">
        <img src={`/${image[0]}`} alt="" />
      </div>
      <h4 className="w-full text-left font-bold">
        Nationality: <span className="font-light">{nationality}</span>
      </h4>
      <h4 className="font-Barlow w-full border-t border-gray-500 pt-2 font-bold">
        Best Sellers
      </h4>
      <p className="max-w-[600px] text-left">
        {books.map((item, index) => {
          if (index === books.length - 1) {
            return (
              <a
                className="cursor-pointer hover:text-green-600 hover:underline"
                onClick={() => {
                  handleOpenPage(item);
                }}
              >
                {item}
              </a>
            );
          }
          return (
            <>
              <a
                className="cursor-pointer hover:text-green-600 hover:underline"
                onClick={() => {
                  handleOpenPage(item);
                }}
              >
                {item}
              </a>{' '}
              -{' '}
            </>
          );
        })}
      </p>
      <h4 className="font-Barlow w-full border-t border-gray-500 pt-2 font-bold">
        History:
      </h4>
      <p className="max-w-[600px] text-left">
        Born in {2024 - age}, lorem ipsum dolor sit amet consectetur adipisicing
        elit. Itaque culpa at rerum, hic repudiandae modi soluta explicabo vero
        optio, necessitatibus perferendis, consequuntur voluptatem. Inventore
        aut dolorum, mollitia perferendis eius numquam?
      </p>
    </div>
  );
};

export default AuthorPage;
