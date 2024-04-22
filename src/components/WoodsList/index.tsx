import { useSelector } from "react-redux";
import Paragraph from "components/Paragraph";
import WoodCard from "components/WoodCard";
import { Wood } from "types";

const classes =
  "grid grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-3 lg:gap-12";

const WoodsList = () => {
  // @ts-ignore
  const woods = useSelector((state) => state.woods.woods);
  return (
    <ul className={classes}>
      {woods.length !== 0 ? (
        woods.map((wood: Wood) => <WoodCard key={wood.id} {...wood} />)
      ) : (
        <Paragraph color="light" align="center">
          Здесь будут ваши леса
        </Paragraph>
      )}
    </ul>
  );
};

export default WoodsList;
