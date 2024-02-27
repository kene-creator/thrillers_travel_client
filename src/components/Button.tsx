import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-[#3563E9] py-2 px-1 text-white lg:w-[60%] font-semibold whitespace-nowrap"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
