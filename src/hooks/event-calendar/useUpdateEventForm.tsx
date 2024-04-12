import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import { useAppSelector } from "store";
import { UpdateEventForm, UpdateEventReq } from "_interfaces/event-calendar.interfaces";
import { useUpdateEventMutation } from "services/modules/event-calendar";
import { uploadFile } from "services/modules/file";
import { toast } from "react-toastify";

const useUpdateEventForm = () => {
  const [updateEvent] = useUpdateEventMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    title: yup
        .string()
        .required('Title is required')
        .min(5, "Title cannot less than 5 char")
        .max(255, "Title cannot more than 255 char"),
    description: yup
        .string()
        .required('Description is required')
        .min(10, "Description cannot less than 10 char"),
    date: yup.string().required('Date is required'),
    location: yup.string().required('Location is required'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
    setFocus,
    watch,
    trigger,
    setValue,
  } = useForm<UpdateEventForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const update = async (data: UpdateEventForm) => {
    try {
      setIsLoading(true);
      const payload : UpdateEventReq = {
        id: data.id,
        title: data.title,
        banner: '',
        description: data.description,
        date: data.date,
        location: data.location,
      };
      if (data.banner instanceof FileList && data.banner.length > 0) {
        const image = await uploadFile(
           accessToken!,
           data.banner[0] as File
        );
        payload.banner = image;
      } else if (typeof data.banner === "string") {
        payload.banner = data.banner;
      }
      await updateEvent(payload).unwrap();
      toast('Event updated successfully');
      reset();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
      
    }
  };

  return {
    handleSubmit,
    update,
    register,
    reset,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
    trigger,
    setValue,
  };
};

export default useUpdateEventForm;

