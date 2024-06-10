import OurLink from "components/Link";
import { useAuth } from "hooks/useAuth";
import { ReactComponent as UserSVG } from "images/user.svg";

const HeaderUser = () => {
  const { isLoaded, isAuth, username, emailHash } = useAuth();

  return (
    <OurLink
      href={isAuth ? "/account" : "/login"}
      extraClass="group flex items-center gap-3 no-underline hover:!text-beige-600 transition-colors"
    >
      {isLoaded && <div>{isAuth ? username : "Войти"}</div>}
      <div className="w-8 h-8 rounded-full bg-beige-600 border border-main relative flex items-center justify-center overflow-hidden transtion-colors group-hover:border-beige-600">
        {emailHash && (
          <div className="w-full h-full bg-beige-600 bg-no-repeat bg-center bg-contain z-[2]">
            <img
              src={`https://gravatar.com/avatar/${emailHash}?d=robohash&s=100`}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        )}
        <div className="svg-wrapper w-8/12 aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <UserSVG />
        </div>
      </div>
    </OurLink>
  );
};

export default HeaderUser;
