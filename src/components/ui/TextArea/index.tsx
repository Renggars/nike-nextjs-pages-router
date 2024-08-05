import React from "react";

type PropsType = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  classname?: string;
};

const TextArea = (props: PropsType) => {
  const {
    label,
    name,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    classname,
  } = props;
  return (
    <div className={`w-full ${classname}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:opacity-70 h-24 resize-none"
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
