import React from "react";
import { Button, Modal } from "react-daisyui";

interface ErrorPopupProps {
  isOpen: boolean;
  data: string;
  onClose: () => void;
  onEdit: () => void;
  menu: string;
}

const SavePopUp: React.FC<ErrorPopupProps> = ({
  isOpen,
  data,
  onClose,
  onEdit,
  menu,
}) => {
  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col justify-center items-center bg-white"
    >
      <Modal.Header className="flex flex-col items-center">
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="68"
            height="68"
            rx="34"
            fill="#BAFBD0"
            fill-opacity="0.2"
          />
          <path
            d="M34 54C45.0457 54 54 45.0457 54 34C54 22.9543 45.0457 14 34 14C22.9543 14 14 22.9543 14 34C14 45.0457 22.9543 54 34 54Z"
            fill="#27A590"
            fill-opacity="0.2"
            stroke="#27A590"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M42 34L34 26L26 34"
            stroke="#27A590"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34 42V26"
            stroke="#27A590"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="53" cy="8" r="2" fill="#27A590" />
          <circle cx="7" cy="47" r="2" fill="#27A590" />
          <path
            d="M12.9996 10.2679L12.9996 13.732L9.99963 12L12.9996 10.2679Z"
            fill="#1A857D"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M61 37C60.996 35.8968 60.1021 35.0037 59 35.0037C60.1046 35.0037 61 34.1066 61 33C61.004 34.1032 61.8979 34.9963 63 34.9963C61.8954 34.9963 61 35.8934 61 37Z"
            fill="#1A857D"
          />
        </svg>

        <div className="font-bold mt-4 text-base">
          {data} {menu}
        </div>
      </Modal.Header>
      <Modal.Body className="text-center text-sm">
        Are You Sure You Want to {data} this {menu}?
      </Modal.Body>
      <Modal.Actions className="flex w-full flex-col items-center">
        <Button
          type="submit"
          className="w-[80%] rounded-full bg-persian-green hover:bg-persian-green/90"
          onClick={onEdit}
        >
          Yes
        </Button>
        <Button
          type="button"
          className="w-[80%] rounded-full text-red-600 mt-2 hover:bg-white/90"
          onClick={onClose}
        >
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SavePopUp;
