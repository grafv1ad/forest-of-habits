import React from "react";
import { Link } from "react-router-dom";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { Wood } from "types";

const linkClasses =
  "flex flex-col justify-end hover:justify-start bg-beige-600 hover:bg-main aspect-[1.7/1] md:aspect-[1.6/1] lg:aspect-[1.5/1] p-3 md:p-4 lg:p-5 relative before:absolute before:-top-8 before:w-1/4 before:h-1/4 before:md:w-1/3 before:md:h-1/3 before:left-[40%] before:md:left-[35%] before:lg:left-[33%] before:content-cone before:block group before:hover:hidden";

const listClasses = "hidden group-hover:block";

const itemClasses = "flex items-center before:content-marker before:pr-3";

const WoodCard: React.FC<Wood> = ({ name, trees, id }) => {
  return (
    <li>
      <Link to={`/forest/${id}`} className={linkClasses}>
        <Title level="3" color="black" align="center" extraClass="mb-0">
          {name}
        </Title>
        <ul className={listClasses}>
          {trees.length !== 0 ? (
            trees.map(({ name, id }) => (
              <li className={itemClasses} key={id}>
                <Paragraph color="black">{name}</Paragraph>
              </li>
            ))
          ) : (
            <li className={itemClasses}>
              <Paragraph color="black">Здесь будут ваши деревья</Paragraph>
            </li>
          )}
        </ul>
      </Link>
    </li>
  );
};

export default WoodCard;
