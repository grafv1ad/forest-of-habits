import React from "react";
import classNames from "classnames";

import { TextProps } from "../../types/index.ts";

const Paragraph: React.FC<TextProps> = ({ children, color, extraClass }) => {
  const classes = classNames(
    "text-base m-0 p-0",
    {
      "text-beige-second": color === "light",
      "text-gray": color === "gray",
      "text-black": color === "dark",
    },
    extraClass
  );

  return <p className={classes}>{children}</p>;
};

export default Paragraph;
