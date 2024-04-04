import WoodCard from "components/WoodCard";

const classes =
  "grid grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-3 lg:gap-12";

const WoodsList = () => {
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
