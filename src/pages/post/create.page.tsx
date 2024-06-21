import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { CreatePostForm, UpdatePostForm } from "_interfaces/post.interface";
import { PDF } from "assets/images";
import ContentContainer from "components/container";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import ImageInput from "components/post/ImageInput";
import PDFViewer from "components/post/PDFViewer";
import ValidationError from "components/validation/error";
import { UserList } from "data/user";
import useCreatePostForm from "hooks/post/useCreatePostForm";
import useFilePreview from "hooks/shared/useFilePreview";
import { useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const createPostRouteName = "post/create";
const CreatePost = () => {
  const navigate = useNavigate();
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const [modalPDF, setModalPDF] = useState<boolean>(false);
  const {
    register,
    errors,
    setFocus,
    isLoading,
    watch,
    handleCreate,
    control,
  } = useCreatePostForm();
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "images",
  });
  const image = watch("images");
  const file = watch("file");
  const imagePreview = image.map(({ file }) => {
    if (file && file[0]) {
      return URL.createObjectURL(file[0]);
    }
  });
  const [filePreview] = useFilePreview(file.file);

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof UpdatePostForm;
    if (firstError) {
      setFocus(firstError);
      const element = errors[firstError]?.ref;
      if (element) {
        element?.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors, setFocus]);

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
  };

  const handleSavePopup = () => {
    setIsSavePopupOpen(!isSavePopupOpen);
  };

  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3 className="text-2xl text-[#262626] font-bold">{`Create Post`}</h3>
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void handleCancelPopup();
              }}
              className="rounded-full px-6 py-2 border-red-500/80 text-red-500/80 hover:border-red-500  hover:text-red-500"
            >
              Cancel
            </Button>
            <CancelPopUp
              isOpen={isCancelPopupOpen}
              data={"Create Post"}
              onClose={handleCancelPopup}
              onEdit={() => {
                navigate(-1);
                handleCancelPopup();
              }}
              menu={"Post"}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void handleSavePopup();
              }}
              loading={isLoading}
              className="rounded-full px-6 py-2 border-[#3AC4A0]/80 text-[#3AC4A0]/80 hover:border-[#3AC4A0]  hover:text-[#3AC4A0]"
            >
              Save
            </Button>
            <SavePopUp
              isOpen={isSavePopupOpen}
              data={"Create"}
              onClose={handleSavePopup}
              onEdit={() => {
                setIsSavePopupOpen(false);
              }}
              menu={"Post"}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <h1 className="font-semibold text-lg">Upload Photo</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                remove(fields.length - 1);
              }}
              disabled={fields.length === 1}
              type="button"
              className="bg-san-juan text-white hover:bg-san-juan/90 disabled:bg-neutral-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Remove
              <MinusIcon
                className="-mr-1 -mb-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Button>
            <Button
              onClick={() => {
                insert(fields.length, { link: "" });
              }}
              disabled={fields.length === 4}
              type="button"
              className="bg-san-juan text-white hover:bg-san-juan/90 disabled:bg-neutral-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Add
              <PlusIcon
                className="-mr-1 -mb-1 h-5 w-5 text-white "
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-4">
          {fields.map((item, i) => (
            <ImageInput
              key={i}
              isWide={fields.length % 2 === 1 && i === fields.length - 1}
              imagePreview={imagePreview[i] ?? item.link}
              register={register(`images.${i}.file`)}
            />
          ))}
        </div>
        <div className="flex flex-col mt-6">
          <h1 className="font-semibold text-lg mb-4">Upload File</h1>
          <div
            className={`w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 col-span-2`}
          >
            {filePreview || file.link ? (
              <>
                <div
                  onClick={() => {
                    setModalPDF(true);
                  }}
                >
                  <img src={PDF} alt="pdf" className="w-20 h-20" />
                </div>
                {modalPDF && (
                  <PDFViewer
                    file={(filePreview ?? file.link) as string}
                    isOpen={modalPDF}
                    onClose={() => setModalPDF(false)}
                  />
                )}
              </>
            ) : (
              <div className="text-san-juan">Choose your PDF file here</div>
            )}
            <FileInput
              {...register("file.file")}
              size="sm"
              accept="application/pdf"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <div data-color-mode="light" className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Post Content</label>
            <Controller
              control={control}
              name="text"
              render={({ field: { value, onChange } }) => (
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={value}
                  onChange={onChange}
                  highlightEnable={false}
                  preview="live"
                />
              )}
            />
            <ValidationError error={errors.text} />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreatePost;
