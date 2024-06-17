type Props = {
  text: string;
};

const ErrorBox = ({ text }: Props) => {
  const isCart = window.location.href.includes('cart') ? true : false; // Variable to reffer to the location of the element

  return (
    <div
      className={`${isCart ? 'mb-2 w-[300px]' : 'm-3 w-full'} rounded-lg border border-black bg-red-400 p-2`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mb-3 size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
      <h1 className="text-left" style={{ maxWidth: '30ch' }}>
        {text}
      </h1>
    </div>
  );
};

export default ErrorBox;
