import { Product } from "@/types/product.type";
import React from "react";
import Card from "./Card";

type PropsType = {
  products: Product[];
};

const ProductView = (props: PropsType) => {
  const { products } = props;
  return (
    // product
    <div className="pt-20 px-[2.5rem]">
      {/* title */}
      <div className="text-3xl font-medium">All Product {products.length}</div>

      {/* main */}
      <div className="flex gap-14">
        {/* main filter */}
        <div className="w-[15%] mt-2 ">
          {/*main filter data */}
          <div className="mt-2">
            {/* filter title */}
            <div className="text-2xl font-medium">Gender</div>
            {/* filer data list */}
            <div className="flex flex-col gap-1 py-5 border-b border-black">
              {/* filter data list item */}
              <div>
                <input type="checkbox" id="men" />
                {/* label */}
                <label htmlFor="men" className="text-xl ml-2">
                  Men
                </label>
              </div>
              <div>
                <input type="checkbox" id="women" />
                {/* label */}
                <label htmlFor="women" className="text-xl ml-2">
                  women
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* main content*/}
        <div className="w-full grid gap-5 grid-cols-3 mb-20 gap-y-10 mt-2">
          {/* content item */}
          {products.map((product) => (
            <Card product={product} key={product.id.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
