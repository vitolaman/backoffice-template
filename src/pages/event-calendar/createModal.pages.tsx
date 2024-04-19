import React, { useEffect, useState } from "react";
import { Button, FileInput, Modal } from "react-daisyui";
import ValidationError from "components/validation/error";
import CancelPopUp from "components/modal/other/Cancel";
import useCreateEventForm from "../../hooks/event-calendar/useCreateEventForm";
import { CreateEventForm } from "_interfaces/event-calendar.interfaces";
import useFilePreview from "hooks/shared/useFilePreview";
import CInput from "components/input";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Controller, useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

interface CreateModalFormProps {
  open: boolean;
  onClose: () => void;
  onCloseSuccess: () => void;
}

const CreateModalForm: React.FC<CreateModalFormProps> = ({
  open,
  onClose,
  onCloseSuccess,
}) => {
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);

  const {
    handleSubmit,
    create,
    register,
    errors,
    reset,
    setFocus,
    isLoading,
    watch,
    control,
  } = useCreateEventForm();

  const { fields, remove, insert } = useFieldArray({
    control,
    name: "link",
  });

  const onSubmit = async (formData: CreateEventForm) => {
    try {
      await create(formData);
      reset();
      reset({ banner: "" });
      onCloseSuccess();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const banner = watch("banner");
  const [imagePreview] = useFilePreview(banner as FileList);

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
  };

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CreateEventForm;
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

  return (
    <div>
      <Modal
        backdrop={false}
        open={open}
        className="bg-white !w-4/6"
        responsive={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <h3 className="text-2xl text-[#262626] font-bold">Create Event</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block font-semibold mb-4"
              >
                Title
              </label>
              <CInput
                type="text"
                id="title"
                {...register("title")}
                placeholder="Enter title..."
                error={errors.title}
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div
                data-color-mode="light"
                className="flex flex-col gap-2"
              >
                <label className="block font-semibold mb-4">Description</label>
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
            <div className="mb-6">
              <label
                htmlFor="date"
                className="block font-semibold mb-4"
              >
                Date
              </label>
              <CInput
                type="date"
                id="date"
                {...register("date")}
                error={errors.date}
              />
            </div>

            <div className="grid grid-cols-2 gap-5 mt-4">
              <div
                className={`mb-6 w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 col-span-2`}
              >
                {banner && imagePreview ? (
                  <img
                    className="flex mx-auto w-[500px] h-[166px] object-cover"
                    src={imagePreview}
                    alt=""
                  />
                ) : (
                  <div className="text-san-juan">Choose your image here</div>
                )}
                <FileInput
                  {...register("banner")}
                  size="sm"
                  accept="image/*"
                />
              </div>
            </div>
            <ValidationError error={errors.banner} />
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block font-semibold mb-4"
              >
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
            <div className="mb-6">
              <label
                htmlFor="link"
                className="block font-semibold mb-4"
              >
                Links
              </label>
              {fields.map((item, i) => (
                <div
                  className="grid grid-cols-3 gap-2"
                  key={i}
                >
                  <CInput
                    type="text"
                    id="link"
                    {...register(`link.${i}.title`)}
                    placeholder="Title"
                  />
                  <div className="col-span-2 flex flex-row gap-4">
                    <CInput
                      type="text"
                      id="link"
                      {...register(`link.${i}.link`)}
                      placeholder="Enter link..."
                    />
                    <Button
                      type="button"
                      color="error"
                      onClick={() => {
                        remove(i);
                      }}
                    >
                      <FaTrash size={20} color="red" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex items-end justify-end mt-4">
                <Button
                  type="button"
                  variant="outline"
                  color="warning"
                  onClick={() => {
                    insert(fields.length, { link: "", title: "" });
                  }}
                  className="rounded-full px-6 py-2 border-green-500/80 text-green-500/80 hover:border-green-500  hover:text-green-500"
                  startIcon={<IoAdd />}
                >
                  Add Link
                </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions className="flex justify-around">
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
            <Button
              type="submit"
              variant="outline"
              loading={isLoading}
              className="rounded-full px-6 py-2 border-san-juan/80 text-san-juan/80 hover:bg-san-juan hover:text-white"
            >
              Save
            </Button>
          </Modal.Actions>
        </form>
      </Modal>

      <CancelPopUp
        isOpen={isCancelPopupOpen}
        data={"Event"}
        onClose={handleCancelPopup}
        onEdit={() => {
          handleCancelPopup();
          onClose();
          reset();
          reset({ banner: "" });
        }}
        menu={"Create"}
      />
    </div>
  );
};

export default CreateModalForm;
