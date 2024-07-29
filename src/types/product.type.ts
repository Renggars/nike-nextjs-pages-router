export type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  stock: [
    {
      size: string;
      qty: number;
    }
  ];
};
