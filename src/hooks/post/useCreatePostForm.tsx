import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { uploadFile } from "services/modules/file";
import { useCreatePostMutation } from "services/modules/post";
import {
  CreatePostForm,
  CreatePostReq,
  UpdatePostForm,
} from "_interfaces/post.interface";

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
  } = useForm<UpdatePostForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      images: [{ link: "" }],
      file: { link: "" },
    },
  });

  const create = async (data: UpdatePostForm) => {
    try {
      setIsLoading(true);
      const imagesTemp = data.images.map((item) => item.link!);
      const payload: CreatePostReq = {
        text: data.text,
        images: imagesTemp,
        file: data.file.link!,
      };
      if (data.file.file && data.file.file[0]) {
        const file = await uploadFile(accessToken!, data.file.file[0] as File);

        payload.file = file;
      }
      const promises: Promise<string>[] = [];
      const newImage: number[] = [];
      data.images.forEach((item, i) => {
        if (item.file && item.file[0]) {
          newImage.push(i);
          promises.push(uploadFile(accessToken!, item.file[0]));
        }
      });
      if (promises.length > 0) {
        const images = await Promise.all(promises);
        images.forEach((item, i) => {
          imagesTemp[newImage[i]] = item;
        });
        payload.images = imagesTemp;
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
