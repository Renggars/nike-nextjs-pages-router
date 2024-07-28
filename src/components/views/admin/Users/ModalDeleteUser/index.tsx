import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";

type PropsType = {
  deletedUser: User | any;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalDeleteUser = (props: PropsType) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
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
