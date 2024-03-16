import React from "react";

import { ButtonProps } from "../../types/index.ts";

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  extraClass,
}) => {
  return (
    <button
      className={`p-6 rounded-lg font-bold text-3xl w-full max-w-2xl mb-10 hover:bg-beige-light active:bg-beige-dark group bg-main disabled:bg-disabled ${extraClass}`}
      onClick={onClick}
      type={type}
    >
      <p className="group-hover:text-gray group-active:text-beige-second">
        {children}
      </p>
    </button>
  );
};

export default Button;
