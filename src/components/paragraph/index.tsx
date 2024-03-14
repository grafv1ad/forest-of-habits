import React from "react";

import { TextProps } from "../../types/index.ts";
import styles from "./styles.module.css";

const Paragraph: React.FC<TextProps> = ({ children, color, extraClass }) => {
  const addedClass = styles[`${color}`];
  return (
    <p className={`${styles.text} ${addedClass} ${extraClass}`}>{children}</p>
  );
};

export default Paragraph;
