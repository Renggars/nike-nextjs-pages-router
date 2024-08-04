import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropsType) => {
  const { address, setChangeAddress, setSelectedAddress, selectedAddress } =
    props;
  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <div className="mb-3 flex justify-center items-center text-lg font-semibold">
        Change Shipping Address
      </div>
      {address.map((item: any, id: number) => (
        <div
          key={item.address}
          className={`w-full border border-solid border-gray-300 p-4 mt-3 rounded-lg flex flex-col ${
            id === selectedAddress
              ? "border-2 border-solid border-gray-400"
              : ""
          }`}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(false);
          }}
        >
          {/* selec title */}
          <div className="font-semibold mb-2">
            Recipient : {item.recipient} - {item.phone}
          </div>
          <p>Phone : {item.phone}</p>
          {/* select address */}
          <p>Address : {item.address}</p>
          {/* select note */}
          <p>Note : {item.note}</p>
        </div>
      ))}
    </Modal>
  );
};

export default ModalChangeAddress;
