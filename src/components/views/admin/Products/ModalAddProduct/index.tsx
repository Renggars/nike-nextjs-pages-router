import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { ToasterContext } from "@/contexts/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PropsType = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
};

const ModalAddProduct = (props: PropsType) => {
  const { setToaster } = useContext(ToasterContext);
  const { setProductsData, setModalAddProduct } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const handleStock = (event: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = event.target.value;
    setStockCount(newStockCount);
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await productServices.updateProduct(id, data);
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success Add Product",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "danger",
                message: "Failed Add Product",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Add Product",
            });
          }
        }
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const stock = stockCount.map((stock) => {
      return { size: stock.size, qty: parseInt(`${stock.qty}`) };
    });

    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: "",
    };

    const result = await productServices.addProduct(data);
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <div className="text-3xl font-bold mb-3">Update User</div>
      <form onSubmit={handleSubmit}>
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
        <Input
          label="Description"
          type="text"
          name="description"
          placeholder="Insert description"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men's Shoes", value: "Men's Shoes" },
            {
              label: "Women's Shoes",
              value: "Women Shoes",
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
        <div className="mt-1">
          <label htmlFor="image">Image</label>
        </div>
        <div className="flex gap-5 justify-center items-center my-1">
          {uploadedImage ? (
            <Image
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              width={150}
              height={150}
              className="rounded-xl"
            />
          ) : (
            <div className="w-[180px] h-[150px] rounded-xl bg-gray-100 flex justify-center items-center">
              No Image
            </div>
          )}
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

        <Button type="submit" classname="mt-4" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
