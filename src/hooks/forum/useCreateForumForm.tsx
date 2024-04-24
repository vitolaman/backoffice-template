import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { uploadFile } from "services/modules/file";
import { CreateForumForm, CreateForumReq } from "_interfaces/forum.interfaces";
import {
  useCreateForumPostMutation,
  useUpdateForumPostMutation,
} from "services/modules/forum";

const useCreateForumForm = (id?: string) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createForumPost] = useCreateForumPostMutation();
  const [updateForumPost] = useUpdateForumPostMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title cannot empty")
      .max(255, "Title cannot more than 255 char")
      .min(5, "Title cannot less than 5 char"),
    description: yup.string().required("Description cannot empty"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    reset,
  } = useForm<CreateForumForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      image: {
        image_link: "",
        image_url: "",
      },
    },
  });

  const create = async (data: CreateForumForm) => {
    try {
      setIsLoading(true);
      const payload: CreateForumReq = {
        date: data.date,
        image: id ? data.image.image_url : "",
        description: data.description,
        location: data.location,
        title: data.title,
        moderator: data.moderator,
      };
      if (data.image.image_link !== "") {
        const images = await uploadFile(
          accessToken!,
          data.image.image_link[0] as File
        );

        payload.image = images;
      }
      if (id) {
        await updateForumPost({ id: id, body: payload }).unwrap();
      } else {
        await createForumPost(payload).unwrap();
      }
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = handleSubmit(create);

  return {
    handleCreate,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
    reset,
  };
};

export default useCreateForumForm;
