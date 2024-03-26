import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
  const { handleSubmit, register } = useForm<SearchI>({ mode: "onSubmit" });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border rounded-full items-center p-2"
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
