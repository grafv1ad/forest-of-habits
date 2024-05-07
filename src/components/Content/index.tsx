import React from "react";
import classNames from "classnames";
import { ContentProps } from "types";

const Content: React.FC<ContentProps> = ({
  verticalCentered = false,
  children,
}) => {
  const mainClasses = classNames("grow flex justify-center p-3 md:px-6", {
    "flex flex-col justify-center": verticalCentered,
  });
  return (
    <main className={mainClasses}>
      <div className="container">
        <div className="text-beige-600 h-full flex flex-col">{children}</div>
      </div>
    </main>
  );
};

export default Content;
