/* eslint-disable prettier/prettier */
import React from "react";
import classNames from "classnames";
import { CheckboxProps } from "types";

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  value,
  children,
  extraClass,
  error,
  touched,
  onChange,
}) => {
  const labelClasses = classNames(
    "relative flex flex-wrap items-center gap-y-1 cursor-pointer",
    extraClass
  );
  const checkboxClasses = classNames(
    "flex shrink-0 items-center justify-center w-10 h-10 mr-3 bg-beige-600 left-0 rounded-lg border-2 border-transparent before:flex before:content-checkbox before:opacity-0 before:transition-opacity before:duration-150 peer-checked:before:opacity-100 transition-colors duration-150 peer-hover:border-main peer-active:border-beige-900 peer-focus:border-beige-900",
    {
      "!border-red": error && touched,
    },
  );
  return (
    <label className={labelClasses}>
      <input
        className="absolute left-0 top-0 opacity-0 pointer-events-none peer"
        name={name}
        type="checkbox"
        value={value}
        onChange={onChange}
      ></input>
      <span className={checkboxClasses}></span>
      <span className="leading-tight">{children}</span>
      {error && touched && <span className="block w-full text-red">{error}</span>}
    </label>
  );
};

export default Checkbox;
