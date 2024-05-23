import { sha256 } from "js-sha256";
import { useAppSelector } from "store";

export const useAuth = () => {
  const { isLoaded, username, email } = useAppSelector((state) => state.user);

  let emailHash: null | string = null;
  if (email) {
    emailHash = sha256(email.trim().toLowerCase());
  }

  return {
    isLoaded,
    username,
    email,
    emailHash,
    isAuth: username && email,
  };
};
