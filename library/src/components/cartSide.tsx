type Props = {
  handleCartClick: VoidFunction;
};

const CartSide = ({ handleCartClick }: Props) => {
  return (
    <div className="fixed right-0 h-screen w-[250px] bg-green-400 px-4 py-5">
      <button className="fixed" onClick={handleCartClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartSide;
