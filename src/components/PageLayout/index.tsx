import React from "react";

import { PageLayoutProps } from "../../types/index.ts";
import Content from "../Content/index.tsx";
import Footer from "../Footer/index.tsx";
import Header from "../Header/index.tsx";

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default PageLayout;
