import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const CartPage = (props: PropsType) => {
  const { setToaster } = props;
  const session: any = useSession();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <div>
      <Head>
        <title>Cart Page</title>
      </Head>
      <CartView setToaster={setToaster} cart={cart} products={products} />
    </div>
  );
};

export default CartPage;
