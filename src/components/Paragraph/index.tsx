import React from "react";
import classNames from "classnames";
import { TextProps } from "types";

const Paragraph: React.FC<TextProps> = ({
  children,
  color = "black",
  align = "start",
  extraClass,
}) => {
  const classes = classNames(
    "text-base m-0 p-0",
    {
      "text-beige-600": color === "light",
      "text-gray": color === "gray",
      "text-black": color === "black",
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
      "text-justify": align === "justify",
    },
    extraClass
  );

  return <div className={classes}>{children}</div>;
};

export default Paragraph;
