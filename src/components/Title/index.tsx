import React from "react";
import classNames from "classnames";
import { TitleProps } from "types";

const Title: React.FC<TitleProps> = ({
  children,
  level,
  color,
  extraClass,
}) => {
  const classes = classNames(
    "font-bold text-center",
    {
      "text-5xl": level === 1,
      "text-3xl": level === 2,
      "text-xl": level === 3,
    },
    {
      "text-beige-600": color === "light",
      "text-black": color === "dark",
    },
    extraClass
  );

  return <h2 className={classes}>{children}</h2>;
};

export default Title;
