import Image from "next/image";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { convertIDR } from "../../../../utils/currency";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/index";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Link from "next/link";

const CartView = () => {
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

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

  const handleDeleteCart = async (id: string, size: string) => {
    const newCart = cart.filter((item: { id: string; size: string }) => {
      return item.id !== id || item.size !== size;
    });
    try {
      const result = await userServices.addToCart({ carts: newCart });
      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          variant: "success",
          message: "Success Delete Item Form Cart",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed Delete Item Form Cart",
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    // cart
    <div className="py-20 px-[12vw] flex gap-10">
      {/* cart main */}
      <div className="w-[80%]">
        {/* cart title */}
        <div className="text-2xl font-semibold">Cart</div>
        {/* main list */}
        {cart.length > 0 ? (
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
                          disabled
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
                          disabled
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className=" w-5 h-6 flex justify-center items-center text-gray-500 mt-2 rounded-sm text-xl "
                      onClick={() => handleDeleteCart(item.id, item.size)}
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
        ) : (
          <div className="mt-5 text-2xl text-gray-500 font-semibold">
            Your Cart Is Empty
          </div>
        )}
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
        <Link href={"/checkout"}>
          <Button
            type="button"
            classname="bg-gray-900 hover:bg-gray-800 rounded-xl"
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartView;
