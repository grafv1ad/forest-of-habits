import HeaderUser from "components/HeaderUser";
import Logo from "components/Logo";

const Header = () => {
  return (
    <header className="flex justify-center p-3 md:p-6">
      <div className="container">
        <div className="flex justify-between gap-4 flex-wrap max-sm:justify-around">
          <Logo />
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
