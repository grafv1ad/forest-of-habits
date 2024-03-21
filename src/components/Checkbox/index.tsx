import React, { useState } from "react";
import classNames from "classnames";
import { CheckboxProps } from "types";

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked = false,
  children,
  extraClass,
}) => {
  const [checkedStatus, setCheckedStatus] = useState<boolean>(checked);
  const classes = classNames(
    "relative flex items-center cursor-pointer",
    extraClass
  );
  return (
    <label className={classes}>
      <input
        className="absolute left-0 top-0 opacity-0 pointer-events-none peer"
        type="checkbox"
        name={name}
        checked={checkedStatus}
        onChange={() => setCheckedStatus(!checkedStatus)}
      ></input>
      <span className="flex shrink-0 items-center justify-center w-10 h-10 mr-3 bg-beige-600 left-0 rounded-lg border-2 border-transparent before:flex before:content-checkbox before:opacity-0 before:transition-opacity before:duration-150 peer-checked:before:opacity-100 transition-colors duration-150 peer-hover:border-main peer-active:border-beige-900 peer-focus:border-beige-900"></span>
      <span className="leading-tight">{children}</span>
    </label>
  );
};

export default Checkbox;
