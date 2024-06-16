export type Author = {
  id: string;
  name: string;
  nationality: string;
  age: number;
  image: string[];
  books: string[];
};

export type Book = {
  _id: string;
  name: string;
  category: string[];
  price: number;
  image: string;
  author: Author;
};

export type User = {
  user: string | null;
  id: string | null;
  role: string | null;
  address: {
    street: string | null;
    number: string | null;
    neighborhood: string | null;
    country: string | null;
    complement: string | null;
  };
  paymentMethod: Card[];
  cartItems: { [key: string]: number };
  shoppingValue: string | null;
};

export type Card = {
  name: string | null;
  number: string | null;
  cvv: string | null;
  expDate: string | null;
};
