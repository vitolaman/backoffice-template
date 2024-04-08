import React from "react";
import { FileInput, Modal } from "react-daisyui";

export default function ImageInput({
  register,
  isWide,
  imagePreview,
}: {
  register: any;
  isWide?: boolean;
  imagePreview: string | undefined;
}): React.ReactElement {
  return (
    <div
      className={`w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 ${
        isWide ? "col-span-2" : "col-span-1"
      }`}
    >
      {imagePreview ? (
        <img
          className="flex mx-auto w-[500px] h-[166px] object-fill"
          src={imagePreview}
          alt=""
        />
      ) : (
        <div className="text-san-juan">Choose your image here</div>
      )}
      <FileInput {...register} size="sm" accept="image/*" />
    </div>
  );
}
