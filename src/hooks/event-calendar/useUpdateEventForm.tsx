import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import { useAppSelector } from "store";
import { EventForm, EventFormReq } from "_interfaces/event-calendar.interfaces";
import { useUpdateEventMutation } from "services/modules/event-calendar";

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
    link: yup.string().required('Link is required'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
    setFocus,
    watch,
  } = useForm<EventForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: EventForm) => {
    try {
      setIsLoading(true);
      const payload: EventFormReq = {
        id: data.id,
        title: data.title,
        banner: data.banner,
        description: data.description,
        date: data.date,
        location: data.location,
        link: data.link,
        created_at: new Date().toISOString(),
      };
      await updateEvent(payload).unwrap();
      reset();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
      
    }
  };

const handleUpdate = handleSubmit(create);

  return {
    handleUpdate,
    register,
    reset,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
  };
};

export default useUpdateEventForm;

