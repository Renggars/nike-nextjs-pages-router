import Modal from "@/components/ui/Modal";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { convertIDR } from "../../../../../../utils/currency";
import { Product } from "@/types/product.type";
import Image from "next/image";

type PropsType = {
  detailOrder: any;
  setDetailOrder: Dispatch<SetStateAction<{}>>;
  products: Product[];
};

const ModalDetailOrder = (props: PropsType) => {
  const { detailOrder, setDetailOrder, products } = props;

  const getProduct = (id: string) => {
    const product = products.find((product) => String(product.id) === id);
    return product;
  };

  return (
    <Modal onClose={() => setDetailOrder({})}>
      <h1 className="flex justify-center items-center text-2xl font-semibold">
        Detail Order
      </h1>
      <h2 className="text-lg font-semibold mt-5 mb-1 text-gray-600">
        Data Order
      </h2>
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">Order Id</h4>
          <p>{detailOrder.order_id}</p>
        </div>
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">Total</h4>
          <p>{convertIDR(detailOrder.total)}</p>
        </div>
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">Status</h4>
          <p>{detailOrder.status}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-5 mb-1 text-gray-600">
        Data Recipient
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">Name</h4>
          <p>{detailOrder.address.recipient}</p>
        </div>
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">Phone</h4>
          <p>{detailOrder.address.phone}</p>
        </div>
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">Notes</h4>
          <p>{detailOrder.address.note}</p>
        </div>
        <div className="flex flex-col gap-[1px]">
          <h4 className="font-semibold">AddressLine</h4>
          <p>{detailOrder.address.addressLine}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-1 text-gray-600">
        Data Product
      </h2>
      <div className="w-full mt-6 flex flex-col gap-5 border border-solid border-gray-300 p-5 rounded-lg">
        {detailOrder?.items?.map(
          (item: { id: string; size: string; qty: number }) => (
            // list item
            <Fragment key={`${item.id}-${item.size}`}>
              <div className="flex w-full gap-5">
                {getProduct(item.id)?.image && (
                  <Image
                    src={`${getProduct(item.id)?.image}`}
                    alt="image"
                    width={120}
                    height={120}
                    className=" rounded-lg"
                  />
                )}

                {/* item info */}
                <div className="w-full">
                  {/* title */}
                  <div className="text-lg font-semibold">
                    {getProduct(item.id)?.name}
                  </div>
                  <div className="mt-5">Size {item.size}</div>
                  <div className="mt-1">Quantity {item.qty}</div>
                </div>

                {/* item price */}
                <div className="text-lg font-semibold">
                  {/* price */}
                  <p>{convertIDR(getProduct(item.id)?.price)}</p>
                </div>
              </div>
              <hr className="" />
            </Fragment>
          )
        )}
      </div>
    </Modal>
  );
};

export default ModalDetailOrder;
