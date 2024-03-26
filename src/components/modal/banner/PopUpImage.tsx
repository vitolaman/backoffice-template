import React from "react";
import { Modal } from "react-daisyui";
import { MdCancel } from "react-icons/md";
interface ErrorPopupProps {
  isOpen: boolean;
  data: string | null;
  onClose: () => void;
}

const PopUpImage: React.FC<ErrorPopupProps> = ({ isOpen, data, onClose }) => {
  if (data === null) {
    return null;
  }
  return (
    <Modal
      open={isOpen}
      className="flex flex-col justify-center items-center bg-transparent shadow-none"
    >
      <Modal.Header>
        <MdCancel
          color="white"
          onClick={onClose}
          size={30}
          className="absolute right-3 top-0"
        />
        <img className="mt-8" src={data} alt="data" width={881} height={573} />
      </Modal.Header>
    </Modal>
  );
};

export default PopUpImage;
