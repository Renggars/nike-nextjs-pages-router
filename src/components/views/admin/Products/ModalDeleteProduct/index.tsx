import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import React, { Dispatch, SetStateAction, useState } from "react";

type PropsType = {
  deletedProduct: Product | any;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropsType) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(deletedProduct.id);
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setToaster({
              variant: "success",
              message: "Success Delete Product",
            });
            setDeletedProduct({});
            const { data } = await productServices.getAllProducts();
            setProductsData(data.data);
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Product",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <div className="mb-3 flex justify-center items-center">
        Are you sure to delete this user?
      </div>
      <Button
        type="button"
        onClick={() => handleDelete()}
        classname="bg-red-500 hover:bg-red-600 w-4/5"
      >
        {isLoading ? "Loading..." : "Delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
