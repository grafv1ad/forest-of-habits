import React from "react";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default PageLayout;
