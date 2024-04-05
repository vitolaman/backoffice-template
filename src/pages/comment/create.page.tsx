import MDEditor, { commands } from "@uiw/react-md-editor";
import { CreateCommentForm } from "_interfaces/comment.interface";
import ContentContainer from "components/container";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import DetailPostCard from "components/post/DetailPostCard";
import ValidationError from "components/validation/error";
import { data as postData } from "data/post";
import { UserList } from "data/user";
import useCreateCommentForm from "hooks/comment/useCreateCommentForm";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

export const createCommentRouteName = "comment/create";
const CreateComment = () => {
  const navigate = useNavigate();
  const [userListUpdated, setUserListUpdated] = useState<
    { label: string; data: string }[]
  >([]);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const { errors, setFocus, isLoading, handleCreate, control } =
    useCreateCommentForm();

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CreateCommentForm;
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
      const newPromoCodeList = UserList.map((item) => ({
        label: `${item.name} - ${item.email}`,
        data: item.id,
      }));
      setUserListUpdated(newPromoCodeList);
    }
  }, [UserList]);

  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-2xl text-[#262626] font-bold">{`Create Comment for this Post`}</h3>
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
              menu={"Banner"}
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
              menu={"Banner"}
            />
          </div>
        </div>
        <div />
        <DetailPostCard postDetail={postData.data[0]} />
        <div className="flex flex-col gap-2">
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
                  return item.data === value;
                })}
                onChange={(e) => onChange(e?.data)}
              />
            )}
          />
          <ValidationError error={errors.user_id} />{" "}
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <div data-color-mode="light" className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Comment Content</label>
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

export default CreateComment;
