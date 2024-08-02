import React from "react";

type Option = {
  label: string;
  value: string;
  selected?: boolean;
};

type PropsType = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | any;
};

const Select = (props: PropsType) => {
  const { label, name, defaultValue, disabled, options } = props;

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 pr-3"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:opacity-70"
      >
        {options?.map((option: Option) => (
          <option
            value={option.value}
            key={option.label}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
