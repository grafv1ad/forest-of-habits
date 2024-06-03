import { useState } from "react";
import classNames from "classnames";
import OurLink from "components/Link";

const HeaderMenu = () => {
  const [opened, setOpened] = useState(false);

  const menuItems = [
    { name: "Личный кабинет", link: "/account" },
    { name: "Мои леса", link: "/forests" },
    { name: "Соглашение", link: "/agreement" },
  ];

  const lineClasses = classNames(
    "block h-[3px] rounded-full origin-center transition-all",
    {
      "bg-main": !opened,
      "bg-red": opened,
    }
  );

  return (
    <div className="relative flex items-center">
      <div
        className="flex flex-col justify-center items-end gap-1.5 cursor-pointer"
        onClick={() => setOpened((opened) => !opened)}
      >
        <span
          className={classNames(lineClasses, "w-7", {
            "rotate-45 translate-y-[9px]": opened,
          })}
        ></span>
        <span
          className={classNames(lineClasses, "w-7", {
            "scale-x-0": opened,
          })}
        ></span>
        <span
          className={classNames(lineClasses, {
            "w-5": !opened,
            "w-7 -rotate-45 -translate-y-[9px]": opened,
          })}
        ></span>
      </div>

      <div
        className={classNames(
          "absolute top-[calc(100%+0.75rem)] md:top-[calc(100%+1.5rem)] right-0 flex flex-col gap-1.5 py-3 px-5 rounded-lg bg-beige-600 border-2 border-main whitespace-nowrap transition-transform origin-top",
          {
            "scale-y-0": !opened,
            "scale-y-100": opened,
          }
        )}
      >
        {menuItems.map((item, i) => (
          <OurLink
            key={i}
            href={item.link}
            extraClass="no-underline font-semibold !text-black hover:!text-background"
          >
            {item.name}
          </OurLink>
        ))}
      </div>
    </div>
  );
};

export default HeaderMenu;
