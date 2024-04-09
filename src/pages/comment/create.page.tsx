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
import { useNavigate, useParams } from "react-router-dom";

export const createCommentRouteName = "comment/create/:id";
const CreateComment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userListUpdated, setUserListUpdated] = useState<
    { label: string; value: string }[]
  >([]);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const { errors, setFocus, isLoading, handleCreate, control, reset } =
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

  useEffect(() => {
    reset((prevState) => ({ ...prevState, postId: id as string }));
  }, [id]);

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
              data={"Create Comment"}
              onClose={handleCancelPopup}
              onEdit={() => {
                navigate(-1);
                handleCancelPopup();
              }}
              menu={"Comment"}
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
              menu={"Comment"}
            />
          </div>
        </div>
        <div />
        <DetailPostCard />
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
