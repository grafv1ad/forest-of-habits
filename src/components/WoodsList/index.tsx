import { Navigate } from "react-router-dom";
import Loader from "components/Loader";
import Paragraph from "components/Paragraph";
import WoodCard from "components/WoodCard";
import { useAuth } from "hooks/useAuth";
import { useAppSelector } from "store";
import { Wood } from "types";

const classes =
  "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12";

const WoodsList = () => {
  const { isLoaded, isAuth } = useAuth();
  const { isWoodsLoaded, woods } = useAppSelector((state) => state.woods);

  if (!isLoaded || !isWoodsLoaded) {
    return <Loader />;
  }

  if (isLoaded && !isAuth) {
    return <Navigate replace to="/login" />;
  }

  return (
    <ul className={classes}>
      {woods?.length > 0 ? (
        woods.map((wood: Wood) => {
          console.debug(wood);
          return <WoodCard key={wood.id} {...wood} />;
        })
      ) : (
        <Paragraph color="light" align="center">
          Здесь будут ваши леса
        </Paragraph>
      )}
    </ul>
  );
};

export default WoodsList;
