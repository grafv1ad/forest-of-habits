import React from "react";
import { FormWrapperProps } from "types";

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col align gap-5 w-full lg:w-3/4 xl:w-2/4">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
