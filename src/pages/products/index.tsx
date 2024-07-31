import ProductView from "@/components/views/products";
import productServices from "@/services/product";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products} />
    </div>
  );
};

export default ProductPage;
