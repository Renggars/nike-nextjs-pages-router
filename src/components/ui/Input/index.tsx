import React from "react";

type PropsType = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
};

const Input = (props: PropsType) => {
  const { type, label, name, placeholder } = props;
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
    </div>
  );
};

export default Input;
