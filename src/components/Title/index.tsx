import React from "react";

import { TitleProps } from "../../types/index.ts";
import styles from "./styles.module.css";

const Title: React.FC<TitleProps> = ({ children, level, extraClass }) => {
  const addedClass = styles[`title_${level}`];
  return (
    <h2 className={`${styles.title} ${addedClass} ${extraClass}`}>
      {children}
    </h2>
  );
};

export default Title;
