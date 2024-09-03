import { Product } from "@/types/product.type";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { convertIDR } from "../../../../utils/currency";
import Button from "@/components/ui/Button/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropsType = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
};

const DetailProductView = (props: PropsType) => {
  const { setToaster } = useContext(ToasterContext);
  const { product, cart, productId } = props;
  const { status }: any = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            qty: 1,
            size: selectedSize,
          },
        ];
      }
      try {
        const result = await userServices.addToCart({
          carts: newCart,
        });
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            variant: "success",
            message: "Success Add To Cart",
          });
        }
      } catch (error) {
        setSelectedSize("");
        setToaster({
          variant: "danger",
          message: "Failed Add To Cart",
        });
      }
    }
  };

  return (
    <div className="py-[20vh] px-[20vw]">
      {/* detail main */}
      <div className="flex gap-16">
        {/* main left */}
        <div className="w-[55%]">
          <Image
            src={product?.image}
            alt={product?.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* main right */}
        <div className="w-[45%]">
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
                  onClick={() => setSelectedSize(item.size)}
                  className="peer appearance-none"
                  checked={selectedSize === item.size}
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
          <Button
            type={status === "authenticated" ? "submit" : "button"}
            onClick={() => {
              status === "unauthenticated"
                ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                : handleAddToCart();
            }}
            classname="mt-10 bg-gray-900 hover:bg-gray-700"
          >
            Add To Cart
          </Button>
          <div className="mt-10">{product?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
