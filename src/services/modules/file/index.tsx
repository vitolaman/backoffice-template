import { Api } from "services/api";
import { errorHandler } from "services/errorHandler";

export const fileApi = Api.injectEndpoints({
  endpoints: (build) => ({
    upload: build.mutation<{ path: string }, File>({
      query(image) {
        let bodyFormData = new FormData();
        bodyFormData.append("file", image);
        bodyFormData.append("type", "OTHER_URL");

        return {
          url: "/v1/storage/cloud",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadMutation } = fileApi;

export const uploadFile = async (token: string, image: File) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("file", image);
    bodyFormData.append("type", "OTHER_URL");
    const response = await fetch(
      `${process.env.REACT_APP_REST_HOST}/v1/storage/cloud`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: bodyFormData,
      },
    );
    const data = await response.json();
    return data.path;
  } catch (error) {
    errorHandler(error);
  }
};

export const uploadQuizQuestions = async (token: string, file: File) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  return await fetch(
    `${process.env.REACT_APP_REST_HOST}/quiz/v1/questions/upload`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: bodyFormData,
    },
  );
};
