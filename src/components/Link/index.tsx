import React from "react";
import classNames from "classnames";
import { LinkProps } from "types";

const Link: React.FC<LinkProps> = ({
  href,
  target,
  rel,
  children,
  extraClass,
}) => {
  const classes = classNames(
    "text-main underline hover:no-underline active:text-beige-900 group",
    extraClass
  );

  return (
    <a className={classes} href={href} target={target} rel={rel}>
      {children}
    </a>
  );
};

export default Link;
