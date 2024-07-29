import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { convertIDR } from "../../../../../utils/currency";
import { Product } from "@/types/product.type";

type PropsType = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropsType) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className="">
          <div className="text-2xl font-medium">Product Management</div>
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
                <>
                  <tr key={product.id} className=" h-12">
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
                      <div className="flex gap-3 justify-center items-center">
                        <Button type="button">
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          classname="bg-red-500 hover:bg-red-600"
                        >
                          <i className="bx bx-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td className="pl-16">{stock.size}</td>
                            <td className="pl-16">{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
