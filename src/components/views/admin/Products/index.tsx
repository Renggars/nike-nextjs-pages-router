import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button/index";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { convertIDR } from "../../../../../utils/currency";
import { Product } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type PropsType = {
  products: Product[];
};

const ProductsAdminView = (props: PropsType) => {
  const { products } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className="h-[100vh] overflow-scroll scroll-smooth p-5">
          <div className="text-2xl font-medium">Product Management</div>
          <div className="flex justify-start mt-2">
            <Button
              type="button"
              classname="w-52 flex justify-center items-center"
              onClick={() => setModalAddProduct(true)}
            >
              <i className="bx bx-plus text-xl mr-1"></i>
              <div>Add Product</div>
            </Button>
          </div>
          <table className="w-full border-collapse border border-solid border-gray-300 mt-3">
            <thead className="text-left p-2">
              <tr className="bg-gray-200 h-12">
                <th rowSpan={2} className="pl-2">
                  Id
                </th>
                <th rowSpan={2} className="pl-10">
                  Image
                </th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2} className="pl-16">
                  Price
                </th>
                <th className="pl-28" colSpan={2}>
                  Stock
                </th>
                <th className="pl-16" rowSpan={2}>
                  Action
                </th>
              </tr>
              <tr className="bg-gray-200 h-12">
                <th className="pl-16">Size</th>
                <th className="pl-16">Qty</th>
              </tr>
            </thead>

            <tbody className="text-left">
              {productsData.map((product: any, index: number) => (
                <Fragment key={product.id}>
                  <tr className=" h-12">
                    <td rowSpan={product.stock.length} className="pl-2">
                      {index + 1}
                    </td>
                    <td rowSpan={product.stock.length} className="pl-10">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      ></Image>
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>
                      {convertIDR(product.price)}
                    </td>
                    <td className="pl-16">{product.stock[0].size}</td>
                    <td className="pl-16">{product.stock[0].qty}</td>
                    <td>
                      <div className="h-full flex justify-center items-center gap-5">
                        <Button
                          type="button"
                          onClick={() => setUpdatedProduct(product)}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          classname="bg-red-500 hover:bg-red-600"
                          onClick={() => setDeletedProduct(product)}
                        >
                          <i className="bx bx-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <Fragment key={stock.size}>
                        {index > 0 && (
                          <tr>
                            <td className="pl-16">{stock.size}</td>
                            <td className="pl-16">{stock.qty}</td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setProductsData={setProductsData}
          setModalAddProduct={setModalAddProduct}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setProductsData={setProductsData}
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setProductsData={setProductsData}
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
        />
      )}
    </>
  );
};

export default ProductsAdminView;
