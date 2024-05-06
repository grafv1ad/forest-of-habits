import HeaderUser from "components/HeaderUser";
import Logo from "components/Logo";

const Header = () => {
  return (
    <header className="flex justify-center p-3">
      <div className="container">
        <div className="flex justify-between">
          <Logo />
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
