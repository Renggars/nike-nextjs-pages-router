import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import React, { Dispatch, SetStateAction, useState } from "react";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalAddProduct = (props: PropsType) => {
  const { setProductsData, setModalAddProduct, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (event: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = event.target.value;
    setStockCount(newStockCount);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <div className="text-3xl font-bold mb-3">Update User</div>
      <form onSubmit={() => {}}>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Insert product name"
        />
        <Input
          label="Price"
          type="number"
          name="price"
          placeholder="Insert price"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            {
              label: "Women",
              value: "women",
            },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            {
              label: "Not Release",
              value: "false",
            },
          ]}
        />
        <div className="my-1">
          <label htmlFor="stock">Stock</label>
        </div>
        {stockCount.map(
          (item: { size: string; qty: number }, index: number) => (
            // form stock
            <div key={index} className="flex gap-5">
              {/* form stock item */}
              <Input
                label="Size"
                type="text"
                name="size"
                placeholder="Insert product size"
                onChange={(event) => handleStock(event, index, "size")}
              />
              <Input
                label="Qty"
                type="number"
                name="qty"
                placeholder="Insert product qty"
                onChange={(event) => handleStock(event, index, "qty")}
              />
            </div>
          )
        )}
        <Button
          type="button"
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
          classname="mt-3"
        >
          Add New Stock
        </Button>
        <div className="mt-1">
          <label htmlFor="image">Image</label>
        </div>
        <InputFile
          name="image"
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
        />
        <Button type="submit" classname="mt-4" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
