import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import React, { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    try {
      const result = await userServices.updateAllUser(updatedUser.id, data);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUser();
        setUsersData(data.data);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <div className="text-3xl font-bold mb-3">Update User</div>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label="Fullname"
          type="fullname"
          name="fullname"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label="Phone"
          type="phone"
          name="phone"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "User", value: "user" },
            {
              label: "Admin",
              value: "admin",
            },
          ]}
        />
        <Button type="submit" classname="mt-5">
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
