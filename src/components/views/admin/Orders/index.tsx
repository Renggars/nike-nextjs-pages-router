import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import userServices from "@/services/user";
import { convertIDR } from "../../../../../utils/currency";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import AdminLayout from "@/components/layouts/AdminLayout";
import transactionServices from "@/services/transaction";

const AdminOrdersView = () => {
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getAllTransaction = async () => {
    const { data } = await transactionServices.getAllTrancation();
    const result = data.data;
    setTransactions(result);
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <AdminLayout>
        <div className="p-5 h-screen overflow-scroll scroll-smooth">
          <div className="text-2xl font-medium">Order List</div>
          <table className="w-full border-collapse border border-solid border-gray-300 mt-3">
            <thead className="text-left p-2">
              <tr className="bg-gray-200 h-12">
                <th className="pl-2">Id</th>
                <th className="pl-10">Order Id</th>
                <th>Username</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {transactions?.map((transaction: any, index: number) => (
                <tr
                  key={transaction.order_id}
                  className="even:bg-gray-200 h-12"
                >
                  <td className="pl-2">{index + 1}</td>
                  <td>{transaction.order_id}</td>
                  <td>{transaction.user.fullname}</td>
                  <td>{convertIDR(transaction.total)}</td>
                  <td>{transaction.status}</td>
                  <td>
                    <div className="flex gap-3 justify-center items-center">
                      <Button
                        type="button"
                        onClick={() => setDetailOrder(transaction)}
                        classname="bg-gray-900 hover:bg-gray-700"
                      >
                        <i className="bx bx-dots-vertical-rounded" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(detailOrder).length > 0 && (
        <ModalDetailOrder
          detailOrder={detailOrder}
          setDetailOrder={setDetailOrder}
          products={products}
        />
      )}
    </>
  );
};

export default AdminOrdersView;
