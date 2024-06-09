export type Author = {
  id: string;
  name: string;
  nationality: string;
  age: number;
  image: string[];
};

export type Book = {
  id: string;
  name: string;
  category: string[];
  price: number;
  image: string[];
  author: Author;
};

export type User = {
  user: string | null;
  id: number | null;
};
