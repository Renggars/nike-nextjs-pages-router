import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import React from "react";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getAllUser();
    setUsersData(data.data);
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
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
