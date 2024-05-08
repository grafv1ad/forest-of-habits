import OurLink from "components/Link";
import { useAuth } from "hooks/useAuth";

const HeaderUser = () => {
  const { isLoaded, isAuth, username } = useAuth();

  // todo: сделать вывод аватарок пользователей
  return (
    <OurLink href="/account" extraClass="flex items-center gap-3 no-underline">
      {isLoaded && <div>{isAuth ? username : "Войти"}</div>}
      <div className="w-8 h-8 rounded-full bg-beige-600 border border-main flex items-center justify-center">
        <div className="bg-user bg-no-repeat bg-center bg-contain w-8/12 aspect-square"></div>
      </div>
    </OurLink>
  );
};

export default HeaderUser;
