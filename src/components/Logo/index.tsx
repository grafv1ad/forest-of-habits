import OurLink from "components/Link";
import logo from "images/logo.svg";

const Logo = () => {
  return (
    <OurLink href="/">
      <img src={logo} alt="Forest of habits" title="Forest of habits" />
    </OurLink>
  );
};

export default Logo;
