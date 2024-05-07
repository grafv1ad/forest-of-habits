import { useSelector } from "react-redux";
import { RootState } from "types/rootState";

export const useAuth = () => {
  const { isLoaded, username } = useSelector((state: RootState) => state.user);

  return {
    isLoaded,
    username,
    isAuth: !!username,
  };
};
