import Button from "@/components/ui/Button/index";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NavItems = [
  {
    title: "New & Featured",
    url: "/newfeatured",
  },
  {
    title: "Men",
    url: "/men",
  },
  {
    title: "Women",
    url: "/women",
  },
  {
    title: "Kids",
    url: "/kids",
  },
  {
    title: "Sale",
    url: "/sale",
  },
  {
    title: "Customise",
    url: "/customise",
  },
  {
    title: "Products",
    url: "/products",
  },
];

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname } = useRouter();
  const [dropdownUser, setDropdownUser] = useState(false);

  return (
    <div className="flex justify-between items-center w-full h-16 bg-[#FFFFFF] fixed top-0 py-5 px-12">
      <Link href={"/"}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-20 w-20 text-[#111111]"
          fill="none"
        >
          <path
            className="font-medium"
            fill="currentColor"
            d="M 21 8.719 L 7.836 14.303 C 6.74 14.768 5.818 15 5.075 15 c -0.836 0 -1.445 -0.295 -1.819 -0.884 c -0.485 -0.76 -0.273 -1.982 0.559 -3.272 c 0.494 -0.754 1.122 -1.446 1.734 -2.108 c -0.144 0.234 -1.415 2.349 -0.025 3.345 c 0.275 0.2 0.666 0.298 1.147 0.298 c 0.386 0 0.829 -0.063 1.316 -0.19 L 21 8.719 Z"
            clipRule={"evenodd"}
            fillRule={"evenodd"}
          ></path>
        </svg>
      </Link>

      {/* navbar */}
      <ul className="flex gap-5 font-semibold cursor-pointer">
        {NavItems.map((item) => (
          <li key={item.title}>
            <Link
              href={item.url}
              className={`hover:underline hover:underline-offset-8 ${
                pathname === item.url ? "text-blue-500" : ""
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-5">
        <search>
          <form>
            <div className="flex rounded-xl bg-[#F5F5F5] justify-center items-center">
              <button className="flex items-center justify-center text-xl ml-[1px] pl-1">
                <i className="bx bx-search"></i>
              </button>
              <input
                type="search"
                placeholder="Search"
                inputMode="search"
                className="bg-transparent placeholder:text-[#707072] flex justify-center items-center w-32 placeholder:font-semibold placeholder:text-lg outline-none p-1"
              />
            </div>
          </form>
        </search>
        <Link href={"/cart"}>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeWidth={1.4}
              d="M 16.794 3.75 c 1.324 0 2.568 0.516 3.504 1.451 a 4.96 4.96 0 0 1 0 7.008 L 12 20.508 l -8.299 -8.299 a 4.96 4.96 0 0 1 0 -7.007 A 4.923 4.923 0 0 1 7.205 3.75 c 1.324 0 2.568 0.516 3.504 1.451 l 0.76 0.76 l 0.531 0.531 l 0.53 -0.531 l 0.76 -0.76 a 4.926 4.926 0 0 1 3.504 -1.451"
            ></path>
          </svg>
        </Link>
        <div>
          <Link href={"/cart"}>
            <i className="bx bx-cart-alt text-2xl cursor-pointer" />
          </Link>
        </div>
        <Button
          type="button"
          onClick={() => signIn()}
          classname="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {data ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
