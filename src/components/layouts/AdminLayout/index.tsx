import Sidebar from "@/components/fragments/Sidebar";
import React from "react";

type PropsType = {
  children: React.ReactNode;
};

const listSideBarItem = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
];

const AdminLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div>
      <Sidebar lists={listSideBarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
