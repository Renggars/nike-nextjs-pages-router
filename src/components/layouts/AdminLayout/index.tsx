import Sidebar from "@/components/fragments/Sidebar";
import React from "react";

type PropsType = {
  children: React.ReactNode;
};

const listSideBarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bx-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bx-group",
  },
];

const AdminLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSideBarItem} />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
