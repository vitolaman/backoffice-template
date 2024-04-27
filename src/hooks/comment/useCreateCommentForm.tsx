import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useCreateCommentMutation,
  useForumCreateCommentMutation,
} from "services/modules/comment";
import { CreateCommentForm } from "_interfaces/comment.interface";

const useCreateCommentForm = (type: string) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createComment] = useCreateCommentMutation();
  const [createForumComment] = useForumCreateCommentMutation();

  const schema = yup.object().shape({
    text: yup
      .string()
      .required("Comment content cannot empty")
      .max(255, "Comment content cannot more than 255 char")
      .min(5, "Comment content cannot less than 5 char"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    reset,
  } = useForm<CreateCommentForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: CreateCommentForm) => {
    try {
      setIsLoading(true);
      const payload = {
        text: data.text,
        postId: data.postId,
      };
      if (type === "forum") {
        await createForumComment(payload).unwrap();
      } else {
        await createComment(payload).unwrap();
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

export default useCreateCommentForm;
