type Props = {
  text: string;
  type: 'submit';
};

const PrimaryButtons = ({ text, type }: Props) => {
  return (
    <button
      type={type}
      className="w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
    >
      {text}
    </button>
  );
};
