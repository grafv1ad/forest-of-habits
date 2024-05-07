import classNames from "classnames";
import loader from "images/loader.svg";

import styles from "./style.module.css";

const imgClasses = classNames(styles.loader, "w-24 md:w-36");

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-background z-30 flex flex-col justify-center items-center gap-4">
      <img src={loader} alt="loader" className={imgClasses} />
      <div className="opacity-75">Loading…</div>
    </div>
  );
};

export default Loader;
