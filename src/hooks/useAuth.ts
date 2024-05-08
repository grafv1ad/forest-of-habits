import { useAppSelector } from "store";

export const useAuth = () => {
  const { isLoaded, username } = useAppSelector((state) => state.user);

  return {
    isLoaded,
    username,
    isAuth: !!username,
  };
};
