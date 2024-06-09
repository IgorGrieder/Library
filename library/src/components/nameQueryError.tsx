const NameQueryError = () => {
  return (
    <div className="m-3 mx-auto w-1/4 rounded-lg border border-black bg-red-400 p-2">
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
      <h1 className="text-left">
        You haven't sent the query data. <br />
        Please try again.
      </h1>
    </div>
  );
};

export default NameQueryError;
