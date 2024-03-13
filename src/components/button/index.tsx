import React from "react";

import { ButtonProps } from "../../types/index.ts";
import styles from "./styles.module.css";

const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return (
    <button
      className={`${styles.button} group bg-main`}
      onClick={onClick}
      type={type}
    >
      <p className="group-hover:text-gray group-active:text-beige-second">
        {children}
      </p>
    </button>
  );
};

export default Button;
