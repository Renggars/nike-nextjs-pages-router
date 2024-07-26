import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import userServices from "@/services/user";
import ModalDeleteUser from "./ModalDeleteUser";

type PropsType = {
  users: any;
};

const UserAdminView = (props: PropsType) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [usersData, setUsersData] = useState([]);
  const [deletedUser, setDeletedUser] = useState<any>({});

  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className="">
          <div className="text-2xl font-medium">User Management</div>
          <table className="w-full border-collapse border border-solid border-gray-300 mt-3">
            <thead className="text-left p-2">
              <tr className="bg-gray-200 h-12">
                <th className="pl-2">Id</th>
                <th className="pl-10">Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="pl-16">Role</th>
                <th className="pl-40">Action</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {usersData.map((user: any, index: number) => (
                <tr key={index} className="even:bg-gray-200 h-12">
                  <td className="pl-2">{index + 1}</td>
                  <td className="pl-10">{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="pl-16">{user.role}</td>
                  <td>
                    <div className="flex gap-3 justify-center items-center">
                      <Button
                        type="button"
                        onClick={() => setUpdatedUser(user)}
                      >
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button
                        type="button"
                        classname="bg-red-500"
                        onClick={() => setDeletedUser(user)}
                      >
                        <i className="bx bx-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UserAdminView;
