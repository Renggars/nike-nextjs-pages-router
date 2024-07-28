import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  title?: string;
  link: string;
  linkText?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: PropsType) => {
  const { title, link, linkText, children } = props;
  return (
    <div className="bg-gray-50 mt-24 md:mt-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {title}
            </h1>
            {children}
            <p>
              {linkText}
              <Link
                href={link}
                className="text-blue-700 font-medium cursor-pointer hover:underline"
              >
                here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
