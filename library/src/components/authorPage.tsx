import { Author } from '@/types/types';

const AuthorPage = ({ name, age, image, nationality }: Author) => {
  const ageDisplay = age === 0 ? '' : ` - ${age}`;
  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <h1 className="font-Barlow mx-auto text-3xl">
        {name}
        {ageDisplay}
      </h1>
      <div className="m-5 h-80 w-96 bg-gray-500"></div>
      <h4 className="font-bold">
        Nationality: <span className="font-light">{nationality}</span>
      </h4>
      <h4 className="font-Barlow w-full border-t border-gray-500 pt-2 font-bold">
        History:
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

export default AuthorPage;
