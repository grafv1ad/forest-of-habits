import React from "react";
import classNames from "classnames";
import { ContentProps } from "types";

const Content: React.FC<ContentProps> = ({
  verticalCentered = false,
  children,
}) => {
  const containerClasses = classNames("container", {
    "flex flex-col justify-center": verticalCentered,
  });
  return (
    <main className="grow flex justify-center p-3 md:px-6">
      <div className={containerClasses}>
        <div className="text-beige-600">{children}</div>
      </div>
    </main>
  );
};

export default Content;
