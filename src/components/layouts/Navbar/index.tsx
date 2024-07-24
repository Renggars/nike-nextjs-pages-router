import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end w-full h-16 bg-gray-400 fixed top-0 p-5">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
