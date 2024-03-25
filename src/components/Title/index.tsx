import React from "react";
import classNames from "classnames";
import { TitleProps } from "types";

const Title: React.FC<TitleProps> = ({
  children,
  level,
  color = "black",
  align = "center",
  extraClass,
}) => {
  const classes = classNames(
    "font-semibold",
    {
      "text-3xl mb-10": level === "1",
      "text-2xl mb-8": level === "2",
      "text-xl mb-6": level === "3",
      "text-lg mb-4": level === "4",
      "text-base mb-4": level === "5" || level === "6",
    },
    {
      "text-beige-600": color === "light",
      "text-black": color === "black",
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    },
    extraClass
  );

  return React.createElement(`h${level}`, { className: classes }, children);
};

export default Title;
