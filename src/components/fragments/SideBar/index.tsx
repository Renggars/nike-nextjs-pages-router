import ButtonManual from "@/components/ui/ButtonManual/index";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type PropsType = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

const Sidebar = (props: PropsType) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className="bg-gray-900 text-white w-3/12 h-[100vh] flex flex-col justify-between">
      <div className="">
        <div className="text-lg font-bold p-5">Admin Panel</div>
        <div className="px-4">
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={index}
              className={`flex items-center mb-3 gap-1 rounded-lg p-1 cursor-pointer hover:bg-slate-200 hover:text-black hover:transition duration-200 ${
                pathname === list.url ? "bg-slate-200 text-black" : ""
              }`}
            >
              <i className={`bx ${list.icon} text-xl`} />
              <div className="text-sm">{list.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-4 mb-5">
        <ButtonManual type="button" onClick={() => signOut()}>
          Logout
        </ButtonManual>
      </div>
    </div>
  );
};

export default Sidebar;
