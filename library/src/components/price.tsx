type Props = {
  price: number;
};

const Price = ({ price }: Props) => {
  return (
    <div className="mb-5 font-semibold">
      Price:{' '}
      <span className="cursor-pointer font-light text-blue-600 hover:underline">
        ${price}
      </span>
    </div>
  );
};

export default Price;
