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
    "bg-main rounded-lg p-2 font-bold text-black transition-colors duration-150 sm:py-2.5 sm:px-4 md:py-3.5 md:px-5 md:text-lg hover:bg-beige-300 active:bg-beige-900 group disabled:bg-disabled",
    extraClass
  );
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
