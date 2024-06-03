import OurLink from "components/Link";

const Footer = () => {
  return (
    <>
      <footer className="flex justify-center p-3 md:p-6">
        <div className="container">
          <div className="flex justify-between items-end">
            <div className="text-gray font-stick">
              <a
                href="https://school.hh.ru/"
                target="_blank"
                className="hover:underline"
              >
                school.hh.ru
              </a>
              &nbsp;©&nbsp;2024
            </div>
            <OurLink
              href="/attribution"
              extraClass="!text-gray !no-underline hover:!underline text-sm"
            >
              Attribution
            </OurLink>
          </div>
        </div>
      </footer>
      <div className="bg-footer bg-100%-auto bg-no-repeat bg-bottom absolute left-0 bottom-0 w-full h-full -z-10 pointer-events-none"></div>
    </>
  );
};

export default Footer;
