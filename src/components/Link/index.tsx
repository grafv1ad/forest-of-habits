import React from "react";

import { LinkProps } from "../../types/index.ts";

const Link: React.FC<LinkProps> = ({ url, children, extraClass }) => {
  return (
    <a
      className={`text-main underline hover:text-beige-300 active:text-beige-900 p-2 group ${extraClass}`}
      href={url}
    >
      {children}
    </a>
  );
};

export default Link;
