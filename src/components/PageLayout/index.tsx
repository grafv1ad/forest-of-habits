import React from "react";
import Content from "components/Content";
import Footer from "components/Footer";
import Header from "components/Header";
import { PageLayoutProps } from "types";

const PageLayout: React.FC<PageLayoutProps> = ({
  verticalCentered = false,
  children,
}) => {
  return (
    <>
      <Header />
      <Content verticalCentered={verticalCentered}>{children}</Content>
      <Footer />
    </>
  );
};

export default PageLayout;
