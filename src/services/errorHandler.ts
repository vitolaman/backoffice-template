import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

interface ErrorData {
  message?: string;
}

export const errorHandler = (error: unknown) => {
  const err = error as FetchBaseQueryError;
  const errorData = err.data as ErrorData;
  toast.error(errorData?.message ?? 'UnkownError');
};
