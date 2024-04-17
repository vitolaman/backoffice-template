import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface SearchI {
  text: string;
}
const SearchInput = ({
  onSubmit,
  placeholder,
}: {
  onSubmit: (data: SearchI) => void;
  placeholder: string;
}) => {
  const { handleSubmit, register, watch } = useForm<SearchI>({
    mode: "onSubmit",
    defaultValues: {
      text: "",
    },
  });
  const text = watch("text");

  useEffect(() => {
    if (text === "") {
      onSubmit({ text });
    }
  }, [text]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border rounded-full border-gray-300 items-center p-2"
    >
      <input
        type="text"
        className="outline-none"
        {...register("text")}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="w-6 h-6 text-[#262626]" />
    </form>
  );
};

export default SearchInput;
