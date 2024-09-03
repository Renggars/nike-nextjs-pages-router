import Button from "@/components/ui/ButtonLast";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NavItems = [
  {
    title: "Home",
    url: "/",
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
    <div className="flex justify-between items-center w-full h-16 bg-gray-50 fixed top-0 py-5 px-[3vw]">
      <div className="text-2xl font-semibold">Toko Sepatu</div>
      {/* navbar */}
      <div className="flex gap-5">
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            href={item.url}
            className={`hover:underline hover:underline-offset-8 ${
              pathname === item.url ? "text-blue-500" : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {/* user */}
      {data ? (
        <div className="flex gap-8 justify-center items-center">
          <div>
            <Link href={"/cart"}>
              <i className="bx bx-cart-alt text-2xl cursor-pointer" />
            </Link>
          </div>
          {/* user profile */}
          <div className="relative">
            <Image
              src={data?.user.image}
              alt={data?.user.name}
              width={40}
              height={40}
              className="rounded-full aspect-square object-cover object-center"
              onClick={() => setDropdownUser(!dropdownUser)}
            />
            {/* navbar user dropdown */}
            <div
              className={`absolute bg-slate-100 right-0 p-5 rounded-md w-[150px] mt-3 z-10 ${
                dropdownUser ? "flex flex-col" : "hidden"
              }`}
            >
              {/* item */}
              <Link
                href={"/member/profile"}
                className="py-2 px-3 text-left hover:bg-slate-200 rounded-lg"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="py-2 px-3 text-left hover:bg-slate-200 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => signIn()}
          classname="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {data ? "Logout" : "Login"}
        </Button>
      )}
    </div>
  );
};

export default Navbar;
