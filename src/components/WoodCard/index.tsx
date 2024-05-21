import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "components/Button";
import Modal from "components/Modal";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { useAppDispatch } from "store";
import { deleteWoodById } from "store/slices/woods";
import { Wood } from "types";

import closeIcon from "../../images/close.svg";

const linkClasses =
  "flex flex-col justify-start lg:justify-end hover:lg:justify-start bg-main lg:bg-beige-600 hover:lg:bg-main aspect-[1.7/1] md:aspect-[1.6/1] lg:aspect-[1.5/1] p-3 md:p-4 lg:p-5 relative before:lg:absolute before:lg:-top-8 before:lg:w-1/3 before:lg:h-1/3 before:lg:left-[35%] before:lg:content-cone before:lg:block group before:lg:hover:hidden";

const listClasses = "lg:hidden lg:group-hover:block";

const itemClasses = "flex items-center before:content-marker before:pr-3";

const buttonClasses =
  "absolute right-0 top-0 z-10 lg:hidden lg:group-hover:block";

const WoodCard: React.FC<Wood> = ({ name, id }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const onHangleModal = () => setOpen(!open);
  const handleClick = () => {
    dispatch(deleteWoodById(id));
  };
  return (
    <>
      <li className={linkClasses}>
        <div className={buttonClasses}>
          <Button
            onClick={onHangleModal}
            extraClass="flex justify-center items-center !p-3"
          >
            <img src={closeIcon} />
          </Button>
        </div>
        <Link to="/">
          <Title level="3" color="black" align="center" extraClass="mb-0">
            {name}
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
        </Link>
      </li>
      <Modal
        open={open}
        onHangleModal={onHangleModal}
        title={`Удалить лес ${name}?`}
      >
        <div className="flex justify-between">
          <Button onClick={handleClick} extraClass="w-1/4">
            Да
          </Button>
          <Button onClick={onHangleModal} extraClass="w-1/4">
            Нет
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default WoodCard;
