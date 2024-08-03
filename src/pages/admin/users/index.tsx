import UserAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUser();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <UserAdminView users={users} />
    </>
  );
};

export default AdminUserPage;
