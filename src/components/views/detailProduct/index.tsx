import { Product } from "@/types/product.type";
import Image from "next/image";
import React from "react";
import { convertIDR } from "../../../../utils/currency";
import Button from "@/components/ui/Button";

type PropsType = {
  product: Product | any;
};

const DetailProductView = (props: PropsType) => {
  const { product } = props;
  console.log(product);
  return (
    // detail
    <div className="py-[20vh] px-[25vw]">
      {/* detail main */}
      <div className="flex gap-16">
        {/* main left */}
        <div className="w-[50%]">
          <Image
            src={product?.image}
            alt={product?.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* main right */}
        <div className="w-[50%]">
          <div className="text-xl font-semibold">{product?.name}</div>
          <div className="text-lg font-medium text-gray-400 mt-2">
            {product?.category}
          </div>
          <div className="mt-5 font-medium">{convertIDR(product?.price)}</div>
          <p className="mt-10 text-lg font-semibold">Select Size</p>
          {/* right size */}
          <div className="grid grid-cols-3 gap-3">
            {/* item size */}
            {product?.stock?.map((item: { size: string; qty: number }) => (
              <div key={item.size} className="w-20 h-10 ">
                <input
                  type="radio"
                  id={`size-${item.size}`}
                  name="size"
                  disabled={item.qty === 0}
                  className="peer appearance-none"
                />
                <label
                  htmlFor={`size-${item.size}`}
                  className="w-full h-full border border-solid flex items-center justify-center cursor-pointer rounded-sm peer-checked:border-2 peer-checked:border-gray-400 peer-disabled:opacity-40 -mt-4 peer-disabled:cursor-default"
                >
                  {item.size}
                </label>
              </div>
            ))}
          </div>
          <Button type="submit" classname="mt-10">
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
