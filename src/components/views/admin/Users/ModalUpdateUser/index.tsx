import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PropsType = {
  updatedUser: User | any;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
};

const ModalUpdateUser = (props: PropsType) => {
  const { setToaster } = useContext(ToasterContext);
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
      const result = await userServices.updateUser(updatedUser.id, data);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUser();
        setUsersData(data.data);
        setToaster({
          variant: "success",
          message: "Success Update User",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Failed Update User",
        });
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
            { label: "Member", value: "member" },
            {
              label: "Admin",
              value: "admin",
            },
          ]}
        />
        <Button type="submit" classname="mt-5">
          {isLoading ? "Updating..." : "Update User"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
