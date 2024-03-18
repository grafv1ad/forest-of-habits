import logo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="flex justify-center p-3">
      <div className="container">
        <div className="flex justify-center">
          <a href="/">
            <img src={logo} alt="Forest of habits" title="Forest of habits" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
