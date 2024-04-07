import { Event } from "_interfaces/event-calendar.interfaces";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import ValidationError from "components/validation/error";
import { dummyEvents } from "data/event-calendar";
import useImagePreview from "hooks/event-calendar/useImagePreview";
import useUpdateEventForm from "hooks/event-calendar/useUpdateEventForm";
import { useState } from "react";
import { Button, FileInput, Modal } from "react-daisyui";

interface UpdateModalProps {
    open: boolean;
    onClose: () => void;
    eventData: Event;
  }

const UpdateEventModal:  React.FC<UpdateModalProps> = ({ open, onClose, eventData }) => {
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const {
    register,
    errors,
    reset,
    setFocus,
    isLoading,
    watch,
    handleUpdate,
    control,
  } = useUpdateEventForm();

  const image = watch("banner.image_link");
  const imagePreview = useImagePreview(image as File);

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
    reset();
  };

  const handleSavePopup = () => {
    setIsSavePopupOpen(!isSavePopupOpen);
    reset();
  };

  const [formData, setFormData] = useState<Event>(eventData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <div>
    <Modal backdrop={false} open={open} className="bg-white">
      <form onSubmit={handleUpdate}>
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
                    value={eventData.id}
                    {...register('id')}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="title" className="block font-semibold mb-4">
                Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={eventData.title}
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
                        value={eventData.description}
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
                    value={eventData.date}
                    {...register('date')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.date} />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-4">
                <div className={`mb-6 w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 col-span-2`}>
                    {imagePreview ? (
                    <img
                        className="flex mx-auto w-[500px] h-[166px] object-fill"
                        src={imagePreview}
                        alt=""
                    />
                    ) : (
                    <div className="text-[#3AC4A0]">Choose your image here</div>
                    )}
                    <FileInput
                    {...register("banner.image_link")}
                    size="sm"
                    accept="image/*"
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
                    value={eventData.location}
                    {...register('location')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.location} />
            </div>
            <div className="mb-6">
                <label htmlFor="link" className="block font-semibold mb-4">
                Link
                </label>
                <input
                    type="text"
                    id="link"
                    value={eventData.link}
                    {...register('link')}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ValidationError error={errors.link} />
            </div>
          </Modal.Body>
          <Modal.Actions className='flex justify-center gap-6'>
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
            
    <SavePopUp
        isOpen={isSavePopupOpen}
        data={"Update"}
        onClose={handleSavePopup}
        onEdit={() => {
        setIsSavePopupOpen(false);
        }}
        menu={"Event"}
    />
    </div>
  );
};

export default UpdateEventModal;
