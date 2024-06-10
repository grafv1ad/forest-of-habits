import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import OurLink from "components/Link";
import { useAuth } from "hooks/useAuth";
import { removeUser } from "store/slices/user";
import { removeCookie } from "utils/cookies";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const [opened, setOpened] = useState(false);

  const menuItems = [
    { name: "Мой аккаунт", link: "/account" },
    { name: "Мои леса", link: "/forests", hidden: !isAuth },
    { name: "Авторы проекта", link: "/authors" },
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
        {menuItems.map((item) => {
          if (item?.hidden) return null;

          return (
            <OurLink
              key={item.name}
              href={item.link}
              extraClass="no-underline font-semibold !text-black hover:!text-green transition-colors"
            >
              {item.name}
            </OurLink>
          );
        })}
        <div className="mt-3">
          {isAuth ? (
            <OurLink
              href="/login"
              onClick={() => {
                dispatch(removeUser());
                removeCookie("token");
              }}
              extraClass="no-underline font-semibold !text-red hover:!text-black transition-colors"
            >
              Выйти
            </OurLink>
          ) : (
            <OurLink
              href="/login"
              extraClass="no-underline font-semibold !text-black hover:!text-green transition-colors"
            >
              Войти
            </OurLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
