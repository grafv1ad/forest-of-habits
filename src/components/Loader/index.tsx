import React from "react";
import classNames from "classnames";
import PageLayout from "components/PageLayout";
import { ReactComponent as LoaderIcon } from "images/loader.svg";
import { LoaderProps } from "types";

import styles from "./style.module.css";

const iconClasses = classNames(
  "flex justify-center items-center w-24 h-24 md:w-36 md:h-36",
  "svg-wrapper",
  styles.loader
);

const Loader: React.FC<LoaderProps> = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <PageLayout>
        <div className="fixed left-0 top-0 w-full h-full bg-background z-30 flex flex-col justify-center items-center gap-4">
          <div className={iconClasses}>
            <LoaderIcon />
          </div>
          <div className="text-beige-600 opacity-75">Loading…</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-background z-30 flex flex-col justify-center items-center gap-4">
      <div className={iconClasses}>
        <LoaderIcon />
      </div>
      <div className="text-beige-600 opacity-75">Loading…</div>
    </div>
  );
};

export default Loader;
