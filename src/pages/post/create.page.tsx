import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { CreatePostForm } from "_interfaces/post.interface";
import ContentContainer from "components/container";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import ValidationError from "components/validation/error";
import { UserList } from "data/user";
import useCreatePostForm from "hooks/post/useCreatePostForm";
import useFilePreview from "hooks/shared/useFilePreview";
import { useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

export const createPostRouteName = "post/create";
const CreatePost = () => {
  const navigate = useNavigate();
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const {
    register,
    errors,
    setFocus,
    isLoading,
    watch,
    handleCreate,
    control,
  } = useCreatePostForm();
  const [userListUpdated, setUserListUpdated] = useState<
    { label: string; value: string }[]
  >([]);
  const [totalImage, setTotalImage] = useState(1);
  const handleCounterTotalImage = (type: "add" | "remove"): void => {
    if (type === "add" && totalImage < 4) {
      setTotalImage((prevState) => prevState + 1);
    } else if (type === "remove" && totalImage > 1) {
      setTotalImage((prevState) => prevState - 1);
    }
  };
  const image1 = watch("image1.image_link");
  const image2 = watch("image2.image_link");
  const image3 = watch("image3.image_link");
  const image4 = watch("image4.image_link");
  const [image1Preview] = useFilePreview(image1 as FileList);
  const [image2Preview] = useFilePreview(image2 as FileList);
  const [image3Preview] = useFilePreview(image3 as FileList);
  const [image4Preview] = useFilePreview(image4 as FileList);

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CreatePostForm;
    if (firstError) {
      setFocus(firstError);
      const element = errors[firstError]?.ref;
      if (element) {
        element?.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors, setFocus]);

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
  };

  const handleSavePopup = () => {
    setIsSavePopupOpen(!isSavePopupOpen);
  };
  useEffect(() => {
    if (UserList && UserList.length > 0) {
      const newPromoCodeList = UserList.map((item, i) => ({
        label: `${item.name} - ${item.email}`,
        value: item.id,
        key: i,
      }));
      setUserListUpdated(newPromoCodeList);
    }
  }, [UserList]);

  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3 className="text-2xl text-[#262626] font-bold">{`Create Post`}</h3>
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void handleCancelPopup();
              }}
              className="rounded-full px-6 py-2 border-red-500/80 text-red-500/80 hover:border-red-500  hover:text-red-500"
            >
              Cancel
            </Button>
            <CancelPopUp
              isOpen={isCancelPopupOpen}
              data={"Create Post"}
              onClose={handleCancelPopup}
              onEdit={() => {
                navigate(-1);
                handleCancelPopup();
              }}
              menu={"Post"}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void handleSavePopup();
              }}
              loading={isLoading}
              className="rounded-full px-6 py-2 border-[#3AC4A0]/80 text-[#3AC4A0]/80 hover:border-[#3AC4A0]  hover:text-[#3AC4A0]"
            >
              Save
            </Button>
            <SavePopUp
              isOpen={isSavePopupOpen}
              data={"Create"}
              onClose={handleSavePopup}
              onEdit={() => {
                setIsSavePopupOpen(false);
              }}
              menu={"Post"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-semibold">Publisher</label>
          <Controller
            control={control}
            name="user_id"
            render={({ field: { value, onChange } }) => (
              <ReactSelect
                styles={{
                  control: (baseStyle) => ({
                    ...baseStyle,
                    padding: 5,
                    borderColor: "#BDBDBD",
                    borderRadius: "0.5rem",
                  }),
                }}
                options={userListUpdated}
                isSearchable={true}
                // onInputChange={(e) => {
                //   setSearch(e);
                // }}
                isLoading={isLoading}
                value={userListUpdated.find((item) => {
                  return item.value === value;
                })}
                onChange={(e) => onChange(e?.value)}
              />
            )}
          />
          <ValidationError error={errors.user_id} />{" "}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Upload Photo</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                handleCounterTotalImage("remove");
              }}
              disabled={totalImage === 1}
              className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]/90 disabled:bg-neutral-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Remove
              <MinusIcon
                className="-mr-1 -mb-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Button>
            <Button
              onClick={() => {
                handleCounterTotalImage("add");
              }}
              disabled={totalImage === 4}
              className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]/90 disabled:bg-neutral-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Add
              <PlusIcon
                className="-mr-1 -mb-1 h-5 w-5 text-white "
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-4">
          <div
            className={`w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 ${
              totalImage === 1 ? "col-span-2" : "col-span-1"
            }`}
          >
            {image1Preview ? (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-fill"
                src={image1Preview}
                alt=""
              />
            ) : (
              <div className="text-[#3AC4A0]">Choose your image here</div>
            )}
            <FileInput
              {...register("image1.image_link")}
              size="sm"
              accept="image/*"
            />
          </div>
          {totalImage > 1 && (
            <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 col-span-1">
              {image2Preview ? (
                <img
                  className="flex mx-auto w-[500px] h-[166px] object-fill"
                  src={image2Preview}
                  alt=""
                />
              ) : (
                <div className="text-[#3AC4A0]">Choose your image here</div>
              )}
              <FileInput
                {...register("image2.image_link")}
                size="sm"
                accept="image/*"
              />
            </div>
          )}
          {totalImage > 2 && (
            <div
              className={`w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 ${
                totalImage === 3 ? "col-span-2" : "col-span-1"
              }`}
            >
              {image3Preview ? (
                <img
                  className="flex mx-auto w-[500px] h-[166px] object-fill"
                  src={image3Preview}
                  alt=""
                />
              ) : (
                <div className="text-[#3AC4A0]">Choose your image here</div>
              )}
              <FileInput
                {...register("image3.image_link")}
                size="sm"
                accept="image/*"
              />
            </div>
          )}
          {totalImage > 3 && (
            <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3 col-span-1">
              {image4Preview ? (
                <img
                  className="flex mx-auto w-[500px] h-[166px] object-fill"
                  src={image4Preview}
                  alt=""
                />
              ) : (
                <div className="text-[#3AC4A0]">Choose your image here</div>
              )}
              <FileInput
                {...register("image4.image_link")}
                size="sm"
                accept="image/*"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <div data-color-mode="light" className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Post Content</label>
            <Controller
              control={control}
              name="text"
              render={({ field: { value, onChange } }) => (
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={value}
                  onChange={onChange}
                  highlightEnable={false}
                  preview="live"
                />
              )}
            />
            <ValidationError error={errors.text} />{" "}
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreatePost;
