type BookCart = {
  quantity: number;
  name: string;
  price: number;
  image: string;
};

const CartSideItems = ({ price, image, name, quantity }: BookCart) => {
  return (
    <div className="py-4">
      <div>{name}</div>
      <div>{price}</div>
      <div>{quantity}</div>
      <img src={image} alt="" className="h-[50px]" />
    </div>
  );
};

export default CartSideItems;
