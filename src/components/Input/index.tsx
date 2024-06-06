import React from "react";
import classNames from "classnames";
import { InputProps } from "types";

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  label,
  value,
  autocomplete,
  extraClass,
  disabled = false,
  error,
  touched,
  readOnly,
  onChange,
}) => {
  const classes = classNames(
    "bg-beige-600 rounded-lg border-2 border-transparent focus:!border-beige-900 outline-none transition-colors duration-150 leading-none text-black placeholder:text-gray/50 py-3 px-3.5 sm:py-3.5 sm:px-4.5 md:py-4 md:px-5.5 md:text-lg",
    {
      "!border-red": error && touched,
      "hover:border-main": !disabled,
    },
    extraClass
  );
  return (
    <label className="flex flex-col gap-y-1">
      {label && <span className="text-beige-300">{label}</span>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autocomplete}
        className={classes}
        disabled={disabled}
        onChange={onChange}
        readOnly={readOnly}
      />
      {error && touched && <span className="text-red">{error}</span>}
    </label>
  );
};

export default Input;
