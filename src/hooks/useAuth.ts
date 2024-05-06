import { useAppSelector } from "store";

export const useAuth = () => {
  const { username } = useAppSelector((state) => state.user);

  return {
    isAuth: !!username,
    username,
  };
};
