import React from "react";

import { CheckboxProps } from "../../types/index.ts";
import styles from "./styles.module.css";

const Checkbox: React.FC<CheckboxProps> = ({ children }) => {
  return (
    <label className={styles.label}>
      <input className={`${styles.input} peer`} type="checkbox"></input>
      <span
        className={`${styles.mark} peer-checked:before:content-checkbox peer-hover:opacity-70 peer-active:opacity-50`}
      ></span>
      {children}
    </label>
  );
};

export default Checkbox;
