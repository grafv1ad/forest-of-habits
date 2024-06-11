import React from "react";
import ReactModal from "react-modal";
import Button from "components/Button";
import Title from "components/Title";
import { Modalrops } from "types";

import closeIcon from "../../images/close.svg";

const overlayClasses = "fixed top-0 right-0 left-0 bottom-0 bg-overlay";
const modalClasses =
  "absolute px-4 py-8 md:px-8 md:py-10 max-w-[90%] bg-modal top-2/4 inset-x-2/4 -translate-x-2/4 md:w-2/4 border-none transform -translate-y-2/4 rounded-2xl relative";

ReactModal.setAppElement("#react-modals");

const Modal: React.FC<Modalrops> = ({
  open,
  onHangleModal,
  children,
  title,
}) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onHangleModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={overlayClasses}
      className={modalClasses}
    >
      <div>
        <div>
          {title && (
            <Title level="2" color="light">
              {title}
            </Title>
          )}
          <div className="absolute right-0 -top-5 -translate-y-full lg:top-0 lg:translate-y-0 lg:-right-5 lg:translate-x-full">
            <Button
              onClick={onHangleModal}
              extraClass="flex justify-center items-center !p-3"
            >
              <img src={closeIcon} />
            </Button>
          </div>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
