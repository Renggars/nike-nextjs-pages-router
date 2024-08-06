import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { convertIDR } from "../../../../utils/currency";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import ModalChangeAddress from "./ModalChangeAddress";
import Script from "next/script";
import transactionServices from "@/services/transaction";

const CheckoutView = () => {
  const session: any = useSession();
  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    if (data?.data?.address?.length > 0) {
      data.data.address.filter((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
  };

  const getProduct = (id: string) => {
    const product = products.find((product) => String(product.id) === id);
    return product;
  };

  const getTotalPrice = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  const handleCheckout = async () => {
    const payload = {
      user: {
        fullname: profile.fullname,
        email: profile.email,
        address: profile.address[selectedAddress],
      },
      transaction: {
        items: profile.carts,
        total: getTotalPrice(),
      },
    };
    const { data } = await transactionServices.generateTransaction(payload);
    window.snap.pay(data.data.token);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getProfile();
    }
  }, [session]);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      {/* // cart */}
      <div className="py-20 px-[12vw] flex gap-10">
        {/* cart main */}
        <div className="w-[75%]">
          {/* cart title */}
          <div className="text-2xl font-semibold">Checkout</div>
          {/* main address */}
          <div className="w-full border border-solid border-gray-300 p-5 mt-3 rounded-lg">
            {/* address title */}
            <div className="mb-5 text-lg font-semibold">Shipping Address</div>
            {profile?.address?.length > 0 ? (
              // address selected
              <div className="flex flex-col gap-1">
                {/* selec title */}
                <div className="font-semibold mb-1">
                  {profile?.address[selectedAddress]?.recipient} -{" "}
                  {profile?.address[selectedAddress]?.phone}
                </div>
                {/* select address */}
                <div>{profile?.address[selectedAddress]?.addressLine}</div>
                {/* select note */}
                <p className="mb-3">
                  Note : {profile?.address[selectedAddress]?.note}
                </p>
                <Button
                  type="button"
                  classname="bg-gray-900 hover:bg-slate-800"
                  onClick={() => setChangeAddress(true)}
                >
                  Change Address
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                classname="bg-gray-900 hover:bg-gray-800"
                onClick={() => setChangeAddress(true)}
              >
                Add New Address
              </Button>
            )}
          </div>

          {/* main list */}
          {profile?.carts?.length > 0 ? (
            <div className="w-full mt-5 flex flex-col gap-5 border border-solid border-gray-300 p-5 rounded-lg">
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  // list item
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className="flex w-full gap-5">
                      {getProduct(item.id)?.image && (
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          alt="image"
                          width={100}
                          height={100}
                          className=" rounded-lg"
                        />
                      )}

                      {/* item info */}
                      <div className="w-full">
                        {/* title */}
                        <div className="text-xl font-semibold">
                          {getProduct(item.id)?.name}
                        </div>
                        <div className="mt-5">Size {item.size}</div>
                        <div className="mt-1">Quantity {item.qty}</div>
                      </div>

                      {/* item price */}
                      <div className="text-xl font-semibold">
                        {/* price */}
                        <p>{convertIDR(getProduct(item.id)?.price)}</p>
                      </div>
                    </div>
                    <hr className="" />
                  </Fragment>
                )
              )}
            </div>
          ) : (
            <div className="mt-5 text-2xl text-gray-500 font-semibold">
              Your Cart Is Empty
            </div>
          )}
        </div>

        {/* cart summary */}
        <div className="w-[25%] ">
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
            onClick={() => handleCheckout()}
          >
            Process Payment
          </Button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      )}
    </>
  );
};

export default CheckoutView;
