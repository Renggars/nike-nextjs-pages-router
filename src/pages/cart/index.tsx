import CartView from "@/components/views/cart";
import Head from "next/head";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <Head>
        <title>Cart Page</title>
      </Head>
      <CartView />
    </div>
  );
};

export default CartPage;
