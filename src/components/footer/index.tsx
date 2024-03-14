const Footer = () => {
  return (
    <>
      <footer className="flex justify-center p-3">
        <div className="container">
          <div className="text-gray">
            <a href="https://school.hh.ru/" target="_blank">
              school.hh.ru
            </a>
            &nbsp;©&nbsp;2024
          </div>
        </div>
      </footer>
      <div className="bg-footer bg-contain bg-no-repeat bg-bottom absolute left-0 bottom-0 w-full h-full -z-10 pointer-events-none"></div>
    </>
  );
};

export default Footer;
