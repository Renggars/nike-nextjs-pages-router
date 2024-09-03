import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/ButtonManual/index";
import React, { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import userServices from "@/services/user";
import { convertIDR } from "../../../../../utils/currency";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import MemberLayout from "@/components/layouts/MemberLayout";

const MemberOrdersView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [products, setProducts] = useState([]);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getProfile();
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
      <MemberLayout>
        <div className="p-5 h-screen overflow-scroll scroll-smooth">
          <div className="text-2xl font-medium">Order History</div>
          <table className="w-full border-collapse border border-solid border-gray-300 mt-3">
            <thead className="text-left p-2">
              <tr className="bg-gray-200 h-12">
                <th className="pl-2">Id</th>
                <th className="pl-10">Order Id</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {profile?.transaction?.map((transaction: any, index: number) => (
                <tr
                  key={transaction.order_id}
                  className="even:bg-gray-200 h-12"
                >
                  <td className="pl-2">{index + 1}</td>
                  <td>{transaction.order_id}</td>
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
                      <Button
                        type="button"
                        onClick={() => {
                          window.snap.pay(transaction.token);
                        }}
                        classname="bg-gray-900 hover:bg-gray-700  disabled:hover:bg-gray-600 disabled:bg-gray-600"
                        disabled={transaction.status !== "pending"}
                      >
                        <i className="bx bx-money" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MemberLayout>
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

export default MemberOrdersView;
