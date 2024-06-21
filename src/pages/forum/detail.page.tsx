import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Modal } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline, MdScoreboard } from "react-icons/md";
import { errorHandler } from "services/errorHandler";
import moment from "moment";
import { Comment } from "_interfaces/comment.interface";
import {
  useForumCommentListQuery,
  useForumDeleteCommentMutation,
} from "services/modules/comment";
import DeletePopUp from "components/modal/other/Delete";
import DetailForumCard from "components/forum/DetailForumCard";
import { useUpdateScoreMutation } from "services/modules/auth";
import { UpdateScore } from "_interfaces/auth-api.interfaces";
import { toast } from "react-toastify";

export const detailForumRouteName = "forum/:id";
export default function DetailForumPage(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    limit: 10,
    page: 1,
  });
  const [scoreReferences, setScoreReferences] = useState({
    userId: "",
    reference_id: "",
  });
  const [score, setScore] = useState<number>(0);
  const [scoreModal, setScoreModal] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<string>("");
  const [updateScore] = useUpdateScoreMutation();
  const handleUpdateScore = async (): Promise<void> => {
    try {
      const statusUpdated: UpdateScore = {
        ...scoreReferences,
        changes: score,
        reference_type: "comment",
      };
      await updateScore(statusUpdated);
      setScoreModal(false);
      setScore(0);
      setScoreReferences({ userId: "", reference_id: "" });
      toast.success("Success add score to user");
    } catch (error) {
      errorHandler(error);
    }
  };

  const { data, isLoading, refetch } = useForumCommentListQuery({
    ...searchParams,
    id: id as string,
  });
  const [deleteComment] = useForumDeleteCommentMutation();
  const handleCreateComment = (): void => {
    void navigate(`/comment/create/${id}?type=forum`);
  };
  const handleDeletePopUp = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  const handleDeleteComment = async (id: string): Promise<void> => {
    try {
      const statusUpdated = { id };
      await deleteComment(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const header: Columns<Comment>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "text",
      label: "Comment",
      render: (data) => (
        <p>
          {data?.text !== undefined &&
            (data.text.length > 20
              ? data?.text.slice(0, 15) + "..."
              : data?.text)}
        </p>
      ),
    },
    {
      fieldId: "owner",
      label: "Posted At",
      render: (data) => <p>{moment(data?.created_at).format("MMM Do YY")}</p>,
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <>
          <Menu>
            <MenuHandler>
              <Button
                size="sm"
                className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
                onClick={() => {
                  if (isDropdownOpen === data?.id) {
                    setIsDropdownOpen(null);
                  } else {
                    setIsDropdownOpen(data?.id as string);
                  }
                }}
              >
                ...
              </Button>
            </MenuHandler>
            <MenuList placeholder={""}>
              {data?.user && (
                <MenuItem
                  placeholder={""}
                  className="p-0"
                  onClick={() => {
                    setScoreModal(true);
                    setScoreReferences({
                      userId: data?.user?.id as string,
                      reference_id: data?.id as string,
                    });
                  }}
                >
                  <label
                    htmlFor="item-1"
                    className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                  >
                    <MdScoreboard className="mt-1 me-3 h-4 w-4" />
                    Add Score
                  </label>
                </MenuItem>
              )}
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  setSelectedComment(data?.id as string);
                  handleDeletePopUp();
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdDeleteOutline className="mt-1 me-3 h-4 w-4" />
                  Delete Comment
                </label>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data={"Comment"}
        onClose={handleDeletePopUp}
        onEdit={() => {
          handleDeletePopUp();
          void handleDeleteComment(selectedComment);
        }}
        menu="Comment"
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex mb-4">
            <h3 className="text-2xl text-black font-semibold">Detail Forum</h3>
          </div>
          <DetailForumCard />
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-black font-semibold">Comment List</h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setSearchParams((prev) => ({ ...prev, search: text }));
                }}
              />
              <Button
                onClick={() => {
                  handleCreateComment();
                }}
                className="bg-san-juan text-white hover:bg-san-juan/90"
              >
                Create Comment
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<Comment>
                    columns={header}
                    data={data?.data}
                    loading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {data!?.meta ? (
              <Pagination
                currentPage={data!?.meta.currentPage}
                totalPages={data!?.meta.totalPages}
                onPageChange={handlePageChange}
              />
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        open={scoreModal}
        backdrop={false}
        className="flex flex-col justify-center items-center bg-white"
      >
        <Modal.Header className="flex flex-col items-center">
          <h1 className="text-2xl text-center font-semibold">Add Score</h1>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Input
            value={score}
            onChange={(e) => {
              setScore(e.target.valueAsNumber);
            }}
            type="number"
            className="text-start text-2xl font-medium w-[100px]"
          />
        </Modal.Body>
        <Modal.Actions className="flex w-full flex-col items-center">
          <Button
            type="button"
            className="w-[100%] rounded-full hover:text-success mt-2 bg-success text-white hover:bg-white/90 hover:border-san-juan"
            onClick={() => {
              void handleUpdateScore();
            }}
            disabled={score <= 0 || Number.isNaN(score)}
          >
            Add
          </Button>
          <Button
            type="button"
            className="w-[100%] rounded-full hover:text-san-juan mt-2 bg-san-juan text-white hover:bg-white/90 hover:border-san-juan"
            onClick={() => {
              setScoreModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
