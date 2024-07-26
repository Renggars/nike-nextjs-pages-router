import React from "react";

type PropsType = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  classname?: string;
};

const Button = (props: PropsType) => {
  const { type, onClick, children, classname } = props;
  return (
    <div className="flex justify-center items-center">
      <button
        type={type}
        onClick={onClick}
        className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${classname}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
