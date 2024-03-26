import { LoginReqI } from "_interfaces/auth-api.interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useLoginForm = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }).required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<LoginReqI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  return { handleSubmit, register, errors, watch };
};

export default useLoginForm;
