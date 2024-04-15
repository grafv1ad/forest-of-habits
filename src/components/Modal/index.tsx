import React from "react";
import ReactModal from "react-modal";
import Button from "components/Button";
import Title from "components/Title";
import { Modalrops } from "types";

import closeIcon from "../../images/close.svg";

const overlayClasses = "fixed top-0 right-0 left-0 bottom-0 bg-overlay";
const modalClasses =
  "absolute p-4 md:p-8 bg-modal top-2/4 inset-x-3 md:left-2/4 md:w-2/4 border-none transform md:-translate-x-2/4 -translate-y-2/4 rounded-3xl";

const Modal: React.FC<Modalrops> = ({
  open,
  onHangleModal,
  children,
  title,
}) => {
  ReactModal.setAppElement("#root");
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onHangleModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={overlayClasses}
      className={modalClasses}
    >
      <div className="relative mb-14">
        {title && (
          <Title level="2" color="light">
            {title}
          </Title>
        )}
        <div className="absolute top-0 right-0">
          <Button onClick={onHangleModal}>
            <img src={closeIcon} />
          </Button>
        </div>
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
