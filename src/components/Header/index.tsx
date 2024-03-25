import Logo from "components/Logo";

const Header = () => {
  return (
    <header className="flex justify-center p-3">
      <div className="container">
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
