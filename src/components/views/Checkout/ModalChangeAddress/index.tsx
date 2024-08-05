import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import TextArea from "@/components/ui/TextArea";
import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PropsType = {
  profile: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  setProfile: Dispatch<SetStateAction<any>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropsType) => {
  const {
    profile,
    setChangeAddress,
    setSelectedAddress,
    setProfile,
    selectedAddress,
  } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();

  const handleAddAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let data;
    if (profile.address.length > 0) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setIsAddNew(false);
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Add New Address",
        });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add New Address",
      });
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Delete Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Address",
      });
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Change Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Change Address",
      });
    }
  };

  const handleChangeAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Add New Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add New Address",
      });
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <div className="mb-3 flex justify-center items-center text-lg font-semibold">
        Select Shipping Address
      </div>
      {profile?.address?.map((item: any, id: number) => (
        <div key={id}>
          <div
            className={`w-full border border-solid border-gray-300 p-4 mt-3 rounded-lg flex  ${
              id === selectedAddress
                ? "border-2 border-solid border-gray-400"
                : ""
            }`}
          >
            {/* modal addres info */}
            <div
              className="w-full flex flex-col gap-[1px] cursor-pointer"
              onClick={() => {
                setSelectedAddress(id);
                setChangeAddress(false);
              }}
            >
              {/* info title */}
              <h4 className="font-semibold mb-2">
                Recipient : {item.recipient} - {item.phone}
              </h4>
              <p>Phone : {item.phone}</p>
              <p>Address : {item.addressLine}</p>
              <p>Note : {item.note}</p>
            </div>

            {/* modal button */}
            <div className="flex flex-col gap-3">
              {/* button delete */}
              <button
                type="button"
                className="w-5 h-6 flex text-gray-500 mt-1 rounded-sm text-xl disabled:opacity-40"
                onClick={() => handleDeleteAddress(id)}
                disabled={isLoading || id === selectedAddress}
              >
                <i className="bx bx-trash" />
              </button>

              {/* button change */}
              <button
                type="button"
                className="w-5 h-6 flex text-gray-500 mt-1 rounded-sm text-xl disabled:opacity-40"
                onClick={() => handleChangeMainAddress(id)}
                disabled={isLoading || item.isMain}
              >
                <i className="bx bx-purchase-tag-alt" />
              </button>

              {/* button update */}
              <button
                type="button"
                className="w-5 h-6 flex text-gray-500 mt-1 rounded-sm text-xl disabled:opacity-40"
                onClick={() =>
                  id === updateAddress
                    ? setUpdateAddress(undefined)
                    : setUpdateAddress(id)
                }
                disabled={isLoading}
              >
                <i className="bx bx-pencil" />
              </button>
            </div>
          </div>

          {id === updateAddress && (
            <div className="mt-5">
              <form
                onSubmit={handleChangeAddress}
                className="flex flex-col gap-2"
              >
                <Input
                  type="text"
                  name="recipient"
                  label="Recipient"
                  placeholder="Insert Recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  type="text"
                  name="phone"
                  label="Recipient Phone"
                  placeholder="Insert Recipient Phone"
                  defaultValue={item.phone}
                />
                <TextArea
                  name="addressLine"
                  label="AddressLine"
                  placeholder="Insert AddressLine"
                  defaultValue={item.addressLine}
                />
                <TextArea
                  name="note"
                  label="Note"
                  placeholder="Insert Note"
                  defaultValue={item.note}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  classname="bg-gray-900 hover:bg-gray-800 mt-3"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        classname="bg-gray-900 hover:bg-gray-800 mt-5"
        onClick={() => setIsAddNew(!isAddNew)}
      >
        {isAddNew ? "Cancel" : "Add New Address"}
      </Button>
      {isAddNew && (
        <div className="mt-5">
          <form onSubmit={handleAddAddress} className="flex flex-col gap-2">
            <Input
              type="text"
              name="recipient"
              label="Recipient"
              placeholder="Insert Recipient"
            />
            <Input
              type="text"
              name="phone"
              label="Recipient Phone"
              placeholder="Insert Recipient Phone"
            />
            <TextArea
              name="addressLine"
              label="AddressLine"
              placeholder="Insert AddressLine"
            />
            <TextArea name="note" label="Note" placeholder="Insert Note" />
            <Button
              type="submit"
              disabled={isLoading}
              classname="bg-gray-900 hover:bg-gray-800 mt-3"
            >
              {isLoading ? "Loading..." : "Add Address"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ModalChangeAddress;
