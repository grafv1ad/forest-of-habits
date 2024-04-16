import { useSelector } from "react-redux";
import { RootState } from "types/rootState";

export const useAuth = () => {
  const { username } = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!username,
    username,
  };
};
