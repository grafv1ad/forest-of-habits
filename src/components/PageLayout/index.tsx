import React from "react";
import Breadcrumbs from "components/Breadcrumbs";
import Content from "components/Content";
import Footer from "components/Footer";
import Header from "components/Header";
import { PageLayoutProps } from "types";

const PageLayout: React.FC<PageLayoutProps> = ({
  verticalCentered = false,
  breadcrumbs,
  children,
}) => {
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />
      <Content verticalCentered={verticalCentered}>{children}</Content>
      <Footer />
    </>
  );
};

export default PageLayout;
