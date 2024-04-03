import classNames from "classnames";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

const WoodCard = () => {
  const linkClasses = classNames(
    "flex flex-col justify-end hover:justify-start bg-beige-600 hover:bg-main aspect-[1.7/1] md:aspect-[1.6/1] lg:aspect-[1.5/1] p-3 md:p-4 lg:p-5 relative before:absolute before:-top-8 before:w-1/4 before:h-1/4 before:md:w-1/3 before:md:h-1/3 before:left-[40%] before:md:left-[35%] before:lg:left-[33%] before:content-cone before:block group before:hover:hidden"
  );

  const listClasses = classNames("hidden group-hover:block");

  const itemClasses = classNames(
    "flex items-center before:content-marker before:pr-3"
  );

  return (
    <a href="/" className={linkClasses}>
      <Title level="3" color="black" align="center" extraClass="mb-0">
        Wood1
      </Title>
      <ul className={listClasses}>
        <li className={itemClasses}>
          <Paragraph color="black">Закрыть задачу</Paragraph>
        </li>
        <li className={itemClasses}>
          <Paragraph color="black">Подготовить совместный доклад</Paragraph>
        </li>
        <li className={itemClasses}>
          <Paragraph color="black">Нарисовать 3 картины</Paragraph>
        </li>
      </ul>
    </a>
  );
};

export default WoodCard;
