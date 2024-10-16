import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateEventForm, CreateEventReq } from "_interfaces/event-calendar.interfaces";
import { useCreateEventMutation } from "services/modules/event-calendar";
import { uploadFile } from "services/modules/file";
import { toast } from "react-toastify";

const useCreateEventForm = () => {
  const [createEvent] = useCreateEventMutation();

  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    title: yup
        .string()
        .required('Title is required')
        .min(5, "Title cannot less than 5 char")
        .max(255, "Title cannot more than 255 char"),
    banner: yup.mixed().test('fileList', 'Image is required', (value) => {
      if (!(value instanceof FileList && value.length > 0)) {
        return false;
      }
      return true;
    }),
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
    setError,
  } = useForm<CreateEventForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: CreateEventForm) => {
    try {
      setIsLoading(true);
      const payload : CreateEventReq = {
        title: data.title,
        banner: "",
        description: data.description,
        date: data.date,
        location: data.location,
        link: data.link,
      };
      if (data.banner instanceof FileList && data.banner.length > 0) {
        const image = await uploadFile(
           accessToken!,
           data.banner[0] as File
        );
        payload.banner = image;
      }
      await createEvent(payload).unwrap();
      reset();
      toast('Event created successfully');
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
      
    }
  };

// const handleCreate = handleSubmit(create);

  return {
    handleSubmit,
    create,
    register,
    reset,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
    trigger,
  };
};

export default useCreateEventForm;
