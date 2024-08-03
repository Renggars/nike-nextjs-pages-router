import { Product } from "@/types/product.type";
import Image from "next/image";
import React, { Fragment } from "react";
import { convertIDR } from "../../../../utils/currency";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type PropsType = {
  cart: any;
  products: Product[];
};

const CartView = (props: PropsType) => {
  const { cart, products } = props;

  const getProduct = (id: string) => {
    const product = products.find((product) => String(product.id) === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((product) => String(product.id) === id);
    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );
    const data = options?.filter((option) => option !== undefined);
    return data;
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  return (
    // cart
    <div className="py-20 px-[12vw] flex gap-10">
      {/* cart main */}
      <div className="w-[80%]">
        {/* cart title */}
        <div className="text-2xl font-semibold">Cart</div>
        {/* main list */}
        <div className="w-full mt-5 flex flex-col gap-5">
          {cart.map((item: { id: string; size: string; qty: number }) => (
            // list item
            <Fragment key={`${item.id}-${item.size}`}>
              <div className="flex w-full gap-5">
                {getProduct(item.id)?.image && (
                  <Image
                    src={`${getProduct(item.id)?.image}`}
                    alt="image"
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] rounded-lg"
                  />
                )}

                {/* item info */}
                <div className="w-full">
                  {/* title */}
                  <div className="text-xl font-semibold">
                    {getProduct(item.id)?.name}
                  </div>
                  {/* category */}
                  <p className="mt-2">{getProduct(item.id)?.category}</p>
                  <div className="flex items-center gap-5 mt-4">
                    {/* size */}
                    <label className="flex items-center gap-3">
                      Size
                      <Select
                        name="size"
                        options={getOptionsSize(item.id, item.size)}
                      />
                    </label>
                    {/* qty */}
                    <label className="flex items-center gap-3">
                      Quantity
                      <Input
                        name="qty"
                        type="number"
                        defaultValue={item.qty}
                        classname="w-[50px] "
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className=" w-5 h-6 flex justify-center items-center text-gray-500 mt-2 rounded-sm text-xl "
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>

                {/* item price */}
                <div className="text-xl font-semibold">
                  {/* price */}
                  <p>{convertIDR(getProduct(item.id)?.price)}</p>
                </div>
              </div>
              <hr className="" />
            </Fragment>
          ))}
        </div>
      </div>

      {/* cart summary */}
      <div className="w-[20%] ">
        {/* cart summary title */}
        <div className="text-2xl font-semibold">Summary</div>
        <div className="text-base font-medium flex justify-between my-3">
          <div>Subtotal</div>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <div className="text-base font-medium flex justify-between my-3">
          <div>Delivery</div>
          <p>{convertIDR(0)}</p>
        </div>
        <div className="text-base font-medium flex justify-between my-3">
          <div>Taxes</div>
          <p>{convertIDR(0)}</p>
        </div>
        <hr />
        <div className="text-base font-medium flex justify-between my-5">
          <div>Total</div>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <hr className="mb-5" />
        <Button
          type="button"
          classname="bg-gray-900 hover:bg-gray-800 rounded-xl"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartView;
