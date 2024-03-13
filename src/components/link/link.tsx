import React from "react";

import { LinkProps } from "../../types/index.ts";
import styles from "./styles.module.css";

const Link: React.FC<LinkProps> = ({ url, children }) => {
  return (
    <a className={`${styles.link} group`} href={url}>
      {children}
    </a>
  );
};

export default Link;
