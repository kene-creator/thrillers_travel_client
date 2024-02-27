import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type,
}) => (
  <div>
    <label className="font-bold">{label}</label>
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full py-3 pl-4 pr-12 text-gray-800 bg-[#e9eaea6b] rounded-md focus:outline-none"
    />
  </div>
);

export default InputComponent;
