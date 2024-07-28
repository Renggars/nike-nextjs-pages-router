import Sidebar from "@/components/fragments/Sidebar";
import React from "react";

type PropsType = {
  children: React.ReactNode;
};

const listSideBarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "bx-cart-alt",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: " bx-user",
  },
];

const MemberLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSideBarItem} />
      <div className="w-full p-5">{children}</div>
    </div>
  );
};

export default MemberLayout;
