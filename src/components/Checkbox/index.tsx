import React from "react";
import { CheckboxProps } from "types";

const Checkbox: React.FC<CheckboxProps> = ({ extraClass, children }) => {
  return (
    <label className={`relative flex items-center pl-6 ${extraClass}`}>
      <input className="invisible w-10 h-10 peer" type="checkbox"></input>
      <span
        className={`absolute flex items-center justify-center w-10 h-10 bg-beige-600 left-0 rounded-lg peer-checked:before:content-checkbox peer-hover:opacity-70 peer-active:opacity-50`}
      ></span>
      {children}
    </label>
  );
};

export default Checkbox;
