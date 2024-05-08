import OurLink from "components/Link";
import { ReactComponent as LogoSVG } from "images/logo.svg";

const Logo = () => {
  return (
    <OurLink href="/" title="Forest of habits" extraClass="w-72 svg-wrapper">
      <LogoSVG />
    </OurLink>
  );
};

export default Logo;
