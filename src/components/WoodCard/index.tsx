import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "components/Button";
import Modal from "components/Modal";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import { useAppDispatch } from "store";
import { deleteWoodById } from "store/slices/woods";
import { Wood } from "types";
import { getLineEndingByNumber } from "utils/text";

import closeIcon from "../../images/close.svg";

const linkClasses =
  "flex flex-col justify-start bg-beige-600 p-5 relative group rounded-xl h-64";

const listClasses = "flex flex-col gap-2";

const itemClasses = "flex items-center justify-center";

const buttonClasses = "absolute right-1 top-1 z-10";

const WoodCard: React.FC<Wood> = ({ name, trees, id, totalNumberTrees }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const onHangleModal = () => setOpen(!open);

  const handleClick = () => {
    dispatch(deleteWoodById(id));
  };

  return (
    <>
      <li className="relative">
        <div className={buttonClasses}>
          <Button
            onClick={onHangleModal}
            extraClass="flex justify-center items-center !p-3 !bg-transparent !rounded-full hover:!bg-main"
          >
            <img src={closeIcon} />
          </Button>
        </div>
        <Link to={`/forest/${id}`} className={linkClasses}>
          <Title level="3" color="black" align="center" extraClass="mb-0">
            {name}
          </Title>
          <ul className={listClasses}>
            {trees?.length > 0 ? (
              trees.map(({ name, id }) => (
                <li className={itemClasses} key={id}>
                  <Paragraph color="black">{name}</Paragraph>
                </li>
              ))
            ) : (
              <li className={itemClasses}>
                <Paragraph color="black" align="center" extraClass="w-full">
                  Здесь будут ваши деревья
                </Paragraph>
              </li>
            )}
            {totalNumberTrees > 3 && (
              <li className={classNames(itemClasses, "mt-2 font-semibold")}>
                <Paragraph color="black">
                  И еще{` ${totalNumberTrees} `}
                  {getLineEndingByNumber(totalNumberTrees, [
                    "дерево",
                    "дерева",
                    "деревьев",
                  ])}
                </Paragraph>
              </li>
            )}
          </ul>
        </Link>
      </li>

      <Modal
        open={open}
        onHangleModal={onHangleModal}
        title={`Удалить лес «${name}» ?`}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <Button onClick={onHangleModal} extraClass="w-full md:w-1/4">
            Отмена
          </Button>
          <Button
            onClick={handleClick}
            style="danger"
            extraClass="w-full md:w-1/4"
          >
            Удалить
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default WoodCard;
