import logo from "../../images/logo.svg";
import styles from "./styles.module.css";

const Logo = () => {
  return (
    <img
      width="533"
      height="55"
      src={logo}
      className={styles.logo}
      alt="logo"
    />
  );
};

export default Logo;
