import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { LinkProps } from "types";

const OurLink: React.FC<LinkProps> = ({
  href,
  target,
  rel,
  children,
  onClick,
  extraClass,
}) => {
  const classes = classNames(
    "text-main underline hover:no-underline active:text-beige-900 group",
    extraClass
  );

  return (
    <Link
      className={classes}
      to={href}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default OurLink;
