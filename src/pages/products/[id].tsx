import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProductPage = (props: PropsType) => {
  const { setToaster } = props;
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | {}>({});
  const [cart, setCart] = useState([]);
  const session: any = useSession();

  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <div>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailProductView
        product={product}
        cart={cart}
        productId={id}
        setToaster={setToaster}
      />
    </div>
  );
};

export default DetailProductPage;
