import React from "react";
import classNames from "classnames";
import { ButtonProps } from "types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled = false,
  children,
  onClick,
  extraClass,
}) => {
  const classes = classNames(
    "bg-main rounded-lg font-bold text-black transition-colors duration-150 py-3 px-3.5 sm:py-3.5 sm:px-4.5 md:py-4 md:px-5.5 md:text-lg hover:bg-beige-300 active:bg-beige-900 group",
    extraClass
  );
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className="text-black group-active:text-beige-600 transition-colors duration-150">
        {children}
      </span>
    </button>
  );
};

export default Button;
