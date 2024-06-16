import ButtonQty from './buttonQty';
import Price from './price';

type BookCart = {
  quantity: number;
  name: string;
  price: number;
  image: string;
};

const CartSideItems = ({ price, image, name, quantity }: BookCart) => {
  return (
    <div className="flex flex-col items-center gap-1 py-4 text-black">
      <img src={image} alt="" className="mb-2 w-[80px]" />
      <div className="font-barlow text-center text-xl">{name}</div>
      <Price price={price}></Price>
      <div className="flex items-center gap-2">
        <div>Qty: {quantity}</div>
        <div className="flex gap-2">
          <ButtonQty key={crypto.randomUUID()} icon="-" name={name}></ButtonQty>
          <ButtonQty key={crypto.randomUUID()} icon="+" name={name}></ButtonQty>
        </div>
      </div>
    </div>
  );
};

export default CartSideItems;
