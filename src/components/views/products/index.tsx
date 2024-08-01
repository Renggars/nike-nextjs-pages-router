import { Product } from "@/types/product.type";
import React from "react";
import Card from "./Card";
import Link from "next/link";

type PropsType = {
  products: Product[];
};

const ProductView = (props: PropsType) => {
  const { products } = props;
  return (
    // product
    <div className="pt-20 px-[2.5rem]">
      <div className="text-3xl font-medium">All Product {products.length}</div>
      <div className="flex gap-14">
        <div className="w-[15%] mt-2 ">
          <div className="mt-2">
            <div className="text-2xl font-medium">Gender</div>
            <div className="flex flex-col gap-1 py-5 border-b border-black">
              <div>
                <input type="checkbox" id="men" />
                <label htmlFor="men" className="text-xl ml-2">
                  Men
                </label>
              </div>
              <div>
                <input type="checkbox" id="women" />
                <label htmlFor="women" className="text-xl ml-2">
                  women
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* main content*/}
        <div className="w-full grid gap-5 grid-cols-3 mb-20 gap-y-10 mt-2">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id.toString()}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
