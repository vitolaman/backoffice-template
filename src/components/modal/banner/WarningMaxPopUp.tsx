import React from "react";
import { Button, Modal } from "react-daisyui";
import { FiXCircle } from "react-icons/fi";

interface ErrorPopupProps {
  isOpen: boolean;
  data: string | null;
  onClose: () => void;
}

const WarningMaxPopUp: React.FC<ErrorPopupProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  return (
    <Modal
      backdrop={false}
      open={isOpen}
      className="bg-white flex flex-col justify-center items-center"
    >
      <Modal.Header className="flex flex-col items-center">
        <FiXCircle className="mt-5 h-20 w-20" />
        <div className="font-bold text-base">Oops</div>
      </Modal.Header>
      <Modal.Body className="text-center text-sm font-medium">
        {data}
      </Modal.Body>
      <Modal.Actions className="flex w-full flex-col items-center">
        <Button className="w-[80%] rounded-full bg-[#FDBA22]" onClick={onClose}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default WarningMaxPopUp;
