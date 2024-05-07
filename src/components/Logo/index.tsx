import OurLink from "components/Link";
import logo from "images/logo.svg";

const Logo = () => {
  return (
    <OurLink href="/">
      <img
        src={logo}
        alt="Forest of habits"
        title="Forest of habits"
        className="w-72"
      />
    </OurLink>
  );
};

export default Logo;
