import { Product } from "@/types/product.type";
import Image from "next/image";
import React from "react";
import { convertIDR } from "../../../../../utils/currency";

type PropsType = {
  product: Product;
};
const Card = (props: PropsType) => {
  const { product } = props;
  return (
    <div className="cursor-pointer">
      <Image
        src={product.image}
        alt="image"
        width={500}
        height={500}
        className="w-full rounded-xl"
      />
      {/* item titile */}
      <p className="text-xl font-medium mt-1">{product.name}</p>
      {/* item category */}
      <p className="text-lg font-medium mt-1">{product.category}</p>
      {/* item price */}
      <p className="text-lg font-medium mt-1">{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;
