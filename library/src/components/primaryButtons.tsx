type Props = {
  text: string;
  eventHandler?: VoidFunction;
};

const PrimaryButtons = ({ text, eventHandler }: Props) => {
  return (
    <button
      onClick={eventHandler}
      className="w-[100px] rounded-2xl border border-white bg-black px-4 py-2 text-center text-white hover:border-black hover:bg-transparent hover:text-black"
    >
      {text}
    </button>
  );
};

export default PrimaryButtons;
