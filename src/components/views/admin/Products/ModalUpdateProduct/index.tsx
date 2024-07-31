import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalUpdateProduct = (props: PropsType) => {
  const { setProductsData, setUpdatedProduct, setToaster, updatedProduct } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const handleStock = (event: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = event.target.value;
    setStockCount(newStockCount);
  };

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Update Product",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <div className="text-3xl font-bold mb-3">Update User</div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Insert product name"
          defaultValue={updatedProduct.name}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          placeholder="Insert price"
          defaultValue={updatedProduct.price}
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
          defaultValue={updatedProduct.category}
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
          defaultValue={updatedProduct.status}
        />
        <div className="my-2">
          <label htmlFor="image">Image</label>
        </div>
        <div className="flex gap-5 items-center">
          <Image
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="image"
            width={150}
            height={150}
            className="rounded-xl"
          />
          <InputFile
            name="image"
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
          />
        </div>
        <div className="my-1">
          <label htmlFor="stock">Stock</label>
        </div>
        {stockCount.map(
          (item: { size: string; qty: number }, index: number) => (
            <div key={index} className="flex gap-5">
              <Input
                label="Size"
                type="text"
                name="size"
                placeholder="Insert product size"
                onChange={(event) => handleStock(event, index, "size")}
                defaultValue={item.size}
              />
              <Input
                label="Qty"
                type="number"
                name="qty"
                placeholder="Insert product qty"
                onChange={(event) => handleStock(event, index, "qty")}
                defaultValue={item.qty}
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
        <Button type="submit" classname="mt-4" disabled={isLoading}>
          {isLoading ? "Loading..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
