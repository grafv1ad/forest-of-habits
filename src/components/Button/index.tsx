import React from "react";
import classNames from "classnames";
import { ButtonProps } from "types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  style = "default",
  disabled = false,
  children,
  onClick,
  extraClass,
}) => {
  const classes = classNames(
    "rounded-lg font-bold transition-colors py-3 px-3.5 sm:py-3.5 sm:px-4.5 md:py-4 md:px-5.5 md:text-lg group border-2",
    {
      "text-black bg-main border-transparent hover:bg-beige-900":
        style === "default",
      "text-main bg-transparent border-main hover:border-transparent active:border-transparent hover:bg-beige-900 hover:text-black":
        style === "outline",
      "bg-red border-transparent border-transparent text-beige-600 hover:bg-transparent hover:text-red hover:border-red":
        style === "danger",
      "text-beige-600 bg-green border-transparent hover:bg-beige-600 hover:text-background":
        style === "success",
    },
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
