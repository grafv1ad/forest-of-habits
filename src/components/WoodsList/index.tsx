import classNames from "classnames";
import WoodCard from "components/WoodCard";

const WoodsList = () => {
  const classes = classNames(
    "grid grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
  );

  return (
    <ul className={classes}>
      <li>
        <WoodCard />
      </li>
      <li>
        <WoodCard />
      </li>
      <li>
        <WoodCard />
      </li>
      <li>
        <WoodCard />
      </li>
      <li>
        <WoodCard />
      </li>
      <li>
        <WoodCard />
      </li>
    </ul>
  );
};

export default WoodsList;
