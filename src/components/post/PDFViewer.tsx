import { XCircleIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@material-tailwind/react";
import React from "react";

export default function PDFViewer({
  file,
  isOpen,
  onClose,
}: {
  file: File | string;
  isOpen: boolean;
  onClose: () => void;
}): React.ReactElement {
  return (
    <Dialog
      placeholder={""}
      handler={onClose}
      open={isOpen}
      className="z-[10000] w-screen animate-slide-down fixed left-[100px] widthPDF h-fit text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-transparent"
    >
      <embed
        src={typeof file === "string" ? file : URL.createObjectURL(file)}
        type="application/pdf"
        className="widthPDF h-screen"
      />
      <button className="z-50 fixed text-white top-3 right-8" onClick={onClose}>
        <XCircleIcon className="w-10 h-10" />
      </button>
    </Dialog>
  );
}
