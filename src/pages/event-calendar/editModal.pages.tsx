import { UpdateEventForm, UpdateEventReq } from "_interfaces/event-calendar.interfaces";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import ValidationError from "components/validation/error";
import useUpdateEventForm from "hooks/event-calendar/useUpdateEventForm";
import { useEffect, useState } from "react";
import { Button, FileInput, Modal } from "react-daisyui";
import { useEventDetailQuery } from "services/modules/event-calendar";

interface UpdateModalProps {
    open: boolean;
    onClose: () => void;
    onCloseSuccess: () => void;
    id: string;
  }

const UpdateEventModal:  React.FC<UpdateModalProps> = ({ open, onClose, onCloseSuccess, id }) => {
  const { data } = useEventDetailQuery({ id: id as string });

  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const {
    register,
    errors,
    reset,
    setFocus,
    watch,
    handleUpdate,
    control,
    trigger,
    isLoading,
    setValue,
  } = useUpdateEventForm();

  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
    reset();
    setPreview(undefined);
  };

  const [formData, setFormData] = useState<UpdateEventReq>();

  useEffect(() => {
    if (data) {
      setFormData(data.data);
      setPreview(data.data.banner);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData!,
      [name]: value
    }));
  };

  function handleOnChange(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement & {
        files: FileList;
    }

    const selectedFile = target.files[0];
    
    if (selectedFile) {
        setFile(selectedFile);
        
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const result = fileReader.result;
            if (result) {
                setPreview(result as string);
            }
        }
        
        fileReader.readAsDataURL(selectedFile);
    }
  }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger();

    if(file === undefined){
      setValue("banner", data!?.data.banner);
    }

    if (isValid) {
      await handleUpdate();
      onCloseSuccess();
      setFile(undefined);
      setPreview(undefined);
    } else {
      console.log('There are validation errors in the form');
    }
  };

  return (
    <div>
    <Modal backdrop={false} open={open} className="bg-white">
    {formData &&
      <form onSubmit={handleSubmit}>
        <Modal.Header>
            <h3 className="text-2xl text-[#262626] font-bold">Edit Event</h3>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-6">
                <label htmlFor="title" className="block font-semibold mb-4">
                    ID
                </label>
                <input
                    type="text"
                    id="id"
                    value={formData?.id}
                    {...register('id')}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly
                />
            </div>
            <div className="mb-6">
                <label htmlFor="title" className="block font-semibold mb-4">
                Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData?.title}
                    {...register('title')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.title} />
            </div>
          
            <div className="flex flex-col gap-2 mb-6">
                <div data-color-mode="light" className="flex flex-col gap-2">
                    <label className="block font-semibold mb-4">Description</label>
                    <textarea
                        id="description"
                        {...register('description')}
                        value={formData?.description}
                        onChange={handleChange}
                        rows={4}
                        cols={50}
                        placeholder="Enter description..."
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px', 
                            padding: '8px', 
                            width: '100%' 
                        }}
                    />
                    <ValidationError error={errors.description} />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="date" className="block font-semibold mb-4">
                Date
                </label>
                <input
                    type="date"
                    id="date"
                    value={formData?.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                    {...register('date')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.date} />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-4">
                <div className={`mb-6 w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 col-span-2`}>
                    {preview ? (
                    <img
                        className="flex mx-auto w-[500px] h-[166px] object-fill"
                        src={preview || data?.data.banner}
                        alt=""
                    />
                    ) : (
                    <div className="text-san-juan">Choose your image here</div>
                    )}
                    <FileInput
                    id="banner"
                    {...register("banner")}
                    size="sm"
                    accept="image/*"
                    onChange={handleOnChange}
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="location" className="block font-semibold mb-4">
                Location
                </label>
                <input
                    type="text"
                    id="location"
                    value={formData?.location}
                    {...register('location')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.location} />
            </div>
            {/* <div className="mb-6">
                <label htmlFor="link" className="block font-semibold mb-4">
                Link
                </label>
                <input
                    type="text"
                    id="link"
                    value={eventData!.link}
                    {...register('link')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.link} />
            </div> */}
          </Modal.Body>
          <Modal.Actions className='flex justify-around'>
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
}
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
