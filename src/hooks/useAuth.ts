import { useSelector } from "react-redux";

export const useAuth = () => {
  // @ts-ignore -- todo: убрать
  const { username, token } = useSelector((state) => state.user);

  return {
    isAuth: !!username,
    username,
    token,
  };
};
