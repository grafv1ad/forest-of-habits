import React from "react";
import { FormWrapperProps } from "types";

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return <div className="flex flex-col align gap-5">{children}</div>;
};

export default FormWrapper;
