import React from "react";

type PropsType = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  classname?: string;
  disabled?: boolean;
};

const ButtonManual = (props: PropsType) => {
  const { type, onClick, children, classname, disabled } = props;
  return (
    <div className="flex justify-center items-center">
      <button
        type={type}
        onClick={onClick}
        className={`w-full min-w-20 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-1.5 text-center ${classname}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonManual;
