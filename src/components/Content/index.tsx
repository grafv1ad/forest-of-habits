import React from "react";

import { ContentProps } from "../../../src/types/index.ts";

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="grow flex justify-center p-3">
      <div className="container">
        <div className="text-second">{children}</div>
      </div>
    </main>
  );
};

export default Content;
