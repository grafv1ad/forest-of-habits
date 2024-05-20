import React from "react";
import OurLink from "components/Link";
import { useAuth } from "hooks/useAuth";
import { ReactComponent as UserSVG } from "images/user.svg";

const HeaderUser = () => {
  const { isLoaded, isAuth, username, emailHash } = useAuth();

  return (
    <OurLink href="/account" extraClass="flex items-center gap-3 no-underline">
      {isLoaded && <div>{isAuth ? username : "Войти"}</div>}
      <div className="w-8 h-8 rounded-full bg-beige-600 border border-main relative flex items-center justify-center overflow-hidden">
        {emailHash && (
          <div
            className="w-full h-full bg-beige-600 bg-[image:var(--avatar-url)] bg-no-repeat bg-center bg-contain z-[2]"
            style={
              {
                "--avatar-url": `url('https://gravatar.com/avatar/${emailHash}?d=robohash&s=100')`,
              } as React.CSSProperties
            }
          ></div>
        )}
        <div className="svg-wrapper w-8/12 aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <UserSVG />
        </div>
      </div>
    </OurLink>
  );
};

export default HeaderUser;
