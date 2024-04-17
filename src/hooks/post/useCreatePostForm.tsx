import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { uploadFile } from "services/modules/file";
import { useCreatePostMutation } from "services/modules/post";
import { CreatePostForm, CreatePostReq } from "_interfaces/post.interface";

const useCreatePostForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createPost] = useCreatePostMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    text: yup
      .string()
      .required("Post content cannot empty")
      .max(255, "Post content cannot more than 255 char")
      .min(5, "Post content cannot less than 5 char"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
  } = useForm<CreatePostForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      image1: {
        image_link: "",
        image_url: "",
      },
      image2: {
        image_link: "",
        image_url: "",
      },
      image3: {
        image_link: "",
        image_url: "",
      },
      image4: {
        image_link: "",
        image_url: "",
      },
      file: "",
    },
  });

  const create = async (data: CreatePostForm) => {
    try {
      setIsLoading(true);
      const payload: CreatePostReq = {
        text: data.text,
        images: [],
        file: "",
        user_id: data.user_id,
        by_admin: true,
        created_at: new Date().toISOString(),
      };
      if (data.image1.image_link !== "") {
        const image = await uploadFile(
          accessToken!,
          data.image1.image_link[0] as File
        );

        payload.images.push(image);
      } else {
        payload.images = [];
      }
      if (data.image2.image_link !== "") {
        const image = await uploadFile(
          accessToken!,
          data.image1.image_link[0] as File
        );
        payload.images.push(image);
      }
      if (data.image3.image_link !== "") {
        const image = await uploadFile(
          accessToken!,
          data.image1.image_link[0] as File
        );
        payload.images.push(image);
      }
      if (data.image4.image_link !== "") {
        const image = await uploadFile(
          accessToken!,
          data.image1.image_link[0] as File
        );
        payload.images.push(image);
      }
      if (data.file !== "") {
        const file = await uploadFile(accessToken!, data.file[0] as File);

        payload.file = file;
      }
      await createPost(payload).unwrap();
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
  };
};

export default useCreatePostForm;
