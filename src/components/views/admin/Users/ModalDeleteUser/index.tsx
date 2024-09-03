import Button from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

type PropsType = {
  deletedUser: User | any;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: PropsType) => {
  const { setToaster } = useContext(ToasterContext);
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(deletedUser.id);
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Success Delete User",
      });
      setDeletedUser({});
      const { data } = await userServices.getAllUser();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete User",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
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

export default ModalDeleteUser;
