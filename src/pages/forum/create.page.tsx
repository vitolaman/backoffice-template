import MDEditor, { commands } from "@uiw/react-md-editor";
import { CreateForumForm } from "_interfaces/forum.interfaces";
import ContentContainer from "components/container";
import CInput from "components/input";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import ImageInput from "components/post/ImageInput";
import ValidationError from "components/validation/error";
import useCreateForumForm from "hooks/forum/useCreateForumForm";
import useFilePreview from "hooks/shared/useFilePreview";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const createForumRouteName = "forum/create";
const CreateForum = () => {
  const navigate = useNavigate();
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const {
    register,
    errors,
    setFocus,
    isLoading,
    watch,
    handleCreate,
    control,
  } = useCreateForumForm();
  const image = watch("image.image_link");
  const [imagePreview] = useFilePreview(image as FileList);

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CreateForumForm;
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
          <h3 className="text-2xl text-[#262626] font-bold">{`Create Forum Post`}</h3>
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
              data={"Create Forum Post"}
              onClose={handleCancelPopup}
              onEdit={() => {
                navigate(-1);
                handleCancelPopup();
              }}
              menu={"Forum Post"}
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
              menu={"Forum Post"}
            />
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="title" className="block font-semibold mb-4">
            Title
          </label>
          <CInput
            type="text"
            id="title"
            {...register("title")}
            error={errors.title}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <h1 className="font-semibold text-lg">Upload Photo</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-4">
          <ImageInput
            isWide={true}
            imagePreview={imagePreview}
            register={register("image.image_link")}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="date" className="block font-semibold mb-4">
            Date
          </label>
          <CInput
            type="date"
            id="date"
            {...register("date")}
            error={errors.date}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="location" className="block font-semibold mb-4">
            Location
          </label>
          <CInput
            type="text"
            id="location"
            {...register("location")}
            placeholder="Enter location..."
            error={errors.location}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="moderator" className="block font-semibold mb-4">
            Moderator
          </label>
          <CInput
            type="text"
            id="moderator"
            {...register("moderator")}
            placeholder="Enter Moderator Name"
            error={errors.moderator}
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <div data-color-mode="light" className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Post Content</label>
            <Controller
              control={control}
              name="description"
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
            <ValidationError error={errors.description} />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateForum;
