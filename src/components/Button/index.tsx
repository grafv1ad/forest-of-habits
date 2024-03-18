import React from "react";
import { ButtonProps } from "types";

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  extraClass,
}) => {
  return (
    <button
      className={`p-6 rounded-lg font-bold text-3xl w-full max-w-2xl mb-10 hover:bg-beige-300 active:bg-beige-900 group bg-main disabled:bg-disabled ${extraClass}`}
      onClick={onClick}
      type={type}
    >
      <p className="text-black group-hover:text-gray group-active:text-beige-600">
        {children}
      </p>
    </button>
  );
};

export default Button;
