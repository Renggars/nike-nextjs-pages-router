import UserAdminView from "@/components/views/admin/Users";
import MemberOrdersView from "@/components/views/member/Orders";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";

const MemberOrdersPage = () => {
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
      <MemberOrdersView users={users} />
    </>
  );
};

export default MemberOrdersPage;
