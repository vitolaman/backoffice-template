import MDEditor, { commands } from "@uiw/react-md-editor";
import { UpdateEventForm } from "_interfaces/event-calendar.interfaces";
import CInput from "components/input";
import CancelPopUp from "components/modal/other/Cancel";
import ValidationError from "components/validation/error";
import useUpdateEventForm from "hooks/event-calendar/useUpdateEventForm";
import { useEffect, useState } from "react";
import { Button, FileInput, Modal } from "react-daisyui";
import { Controller, useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useEventDetailQuery } from "services/modules/event-calendar";

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  onCloseSuccess: () => void;
  id: string;
}

const UpdateEventModal: React.FC<UpdateModalProps> = ({
  open,
  onClose,
  onCloseSuccess,
  id,
}) => {
  const { data } = useEventDetailQuery({ id: id as string });

  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const {
    register,
    errors,
    reset,
    setFocus,
    watch,
    handleSubmit,
    update,
    isLoading,
    control,
  } = useUpdateEventForm();

  const { fields, remove, insert } = useFieldArray({
    control,
    name: "link",
  });

  const onSubmit = async (formData: UpdateEventForm) => {
    try {
      await update(formData);
      onCloseSuccess();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
      let temp: UpdateEventForm = {
        id: data?.data.id,
        title: data?.data.title,
        description: data?.data.description,
        date: new Date(data?.data.date).toISOString().split("T")[0],
        location: data?.data.location,
        banner: data?.data.banner,
        link: data?.data.link,
      };
      reset(temp);
    }
  }, [data?.data, reset]);

  const banner = watch("banner");
  const [imagePreview, setImagePreview] = useState<string>();
  useEffect(() => {
    if (banner) {
      if (typeof banner === "string") {
        setImagePreview(banner);
      } else if (banner instanceof FileList && banner[0]) {
        const newUrl = URL.createObjectURL(banner[0]);
        setImagePreview(newUrl);
      }
    }
  }, [banner]);

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
  };

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof UpdateEventForm;
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
        className="bg-white"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <h3 className="text-2xl text-[#262626] font-bold">Edit Event</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block font-semibold mb-4"
              >
                ID
              </label>
              <CInput
                type="text"
                id="id"
                {...register("id")}
                error={errors.id}
                readOnly
              />
            </div>
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
                {imagePreview ? (
                  <img
                    className="flex mx-auto w-[500px] h-[166px] object-cover"
                    alt=""
                    src={imagePreview}
                  />
                ) : (
                  <div className="text-san-juan">Choose your image here</div>
                )}
                <FileInput
                  id="banner"
                  {...register("banner")}
                  size="sm"
                  accept="image/*"
                />
              </div>
            </div>
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
                      <FaTrash
                        size={20}
                        color="red"
                      />
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
              className="rounded-full px-6 py-2 border-san-juan/80 text-san-juan/80 hover:bg-san-juan  hover:text-white"
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
        }}
        menu={"Update"}
      />
    </div>
  );
};

export default UpdateEventModal;
