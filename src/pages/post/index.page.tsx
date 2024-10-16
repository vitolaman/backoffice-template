import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Select } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { PostList, PostListReq } from "_interfaces/post.interface";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline, MdScoreboard } from "react-icons/md";
import { errorHandler } from "services/errorHandler";
import moment from "moment";
import { useDeletePostMutation, usePostListQuery } from "services/modules/post";
import PDFViewer from "components/post/PDFViewer";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import DeletePopUp from "components/modal/other/Delete";
import { FaRegFilePdf } from "react-icons/fa";
import ContentContainer from "components/container";
import { useUpdateScoreMutation } from "services/modules/auth";
import { UpdateScore } from "_interfaces/auth-api.interfaces";
import { toast } from "react-toastify";

export const postRouteName = "post";
export default function PostPage(): React.ReactElement {
  const navigate = useNavigate();
  const [score, setScore] = useState<number>(0);
  const [scoreModal, setScoreModal] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<PostListReq>({
    search: "",
    limit: 10,
    page: 1,
  });
  const [scoreReferences, setScoreReferences] = useState({
    userId: "",
    reference_id: "",
  });
  const [selectedPost, setSelectedPost] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [modalPDF, setModalPDF] = useState<boolean>(false);
  const [file, setFile] = useState("");
  const { data, isLoading, refetch } = usePostListQuery(searchParams);
  const [deletePost] = useDeletePostMutation();
  const [updateScore] = useUpdateScoreMutation();
  const handleDeletePopUp = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  const handleCreatePost = (): void => {
    void navigate("/post/create");
  };

  const handleDeletePost = async (id: string): Promise<void> => {
    try {
      const statusUpdated = { id };
      await deletePost(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdateScore = async (): Promise<void> => {
    try {
      const statusUpdated: UpdateScore = {
        ...scoreReferences,
        changes: score,
        reference_type: "post",
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
  const header: Columns<PostList>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "by_admin",
      label: "Published By",
      render: (data) => (
        <p key={data?.id}>{data?.by_admin ? "Admin" : "Personal"}</p>
      ),
    },
    {
      fieldId: "text",
      label: "Post Content",
      render: (data) => (
        <p
          onClick={() => {
            navigate(`/post/${data?.id}`);
          }}
          className="underline hover:text-blue-300 cursor-pointer"
        >
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
      render: (data) => (
        <p>{moment(data?.created_at).format("MMM Do, YYYY")}</p>
      ),
    },
    {
      fieldId: "likes",
      label: "Total Like",
    },
    {
      fieldId: "file",
      label: "Document",
      render: (data) => (
        <div>
          {data?.file === null ? (
            <p>-----</p>
          ) : (
            <Button
              onClick={() => {
                setModalPDF(true);
                setFile(data?.file as string);
              }}
              className="rounded hover:bg-transparent w-full h-full border-none relative z-50 text-center flex justify-center items-center"
            >
              <FaRegFilePdf />
            </Button>
          )}
        </div>
      ),
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
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  navigate(`/post/${data?.id}`);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <EyeIcon className="mt-1 me-3 h-4 w-4" />
                  See Detail
                </label>
              </MenuItem>
              {data?.by_admin === false && (
                <MenuItem
                  placeholder={""}
                  className="p-0"
                  onClick={() => {
                    setScoreModal(true);
                    setScoreReferences({
                      userId: data.userId as string,
                      reference_id: data.id,
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
              {data?.by_admin && (
                <MenuItem
                  placeholder={""}
                  className="p-0"
                  onClick={() => {
                    navigate(`/post/edit/${data?.id}`);
                  }}
                >
                  <label
                    htmlFor="item-1"
                    className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                  >
                    <PencilIcon className="mt-1 me-3 h-4 w-4" />
                    Edit Post
                  </label>
                </MenuItem>
              )}
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  setSelectedPost(data?.id as string);
                  handleDeletePopUp();
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdDeleteOutline className="mt-1 me-3 h-4 w-4" />
                  Delete Post
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
    <ContentContainer>
      <PDFViewer
        file={file as string}
        isOpen={modalPDF}
        onClose={() => setModalPDF(false)}
      />
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data={"Post"}
        onClose={handleDeletePopUp}
        onEdit={() => {
          handleDeletePopUp();
          void handleDeletePost(selectedPost);
        }}
        menu="Post"
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">Post List</h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setSearchParams((prev) => ({ ...prev, search: text }));
                }}
              />
              <input
                type="date"
                placeholder="Post Date"
                className="border rounded-full !border-gray-50 p-2"
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, date: e.target.value }))
                }
              />
              <Select
                value={searchParams.by}
                className="border-gray-300 rounded-full"
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    by: e.target.value === "Admin" ? "Admin" : "User",
                  }))
                }
              >
                <option value="">Posted By</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
              <Button
                onClick={() => {
                  setSearchParams({
                    search: "",
                    limit: 10,
                    page: 1,
                  });
                }}
                className="bg-red-400 text-white hover:bg-red-400/90"
              >
                Reset Filter
              </Button>
              <Button
                onClick={() => {
                  handleCreatePost();
                }}
                className="bg-san-juan text-white hover:bg-san-juan/90"
              >
                Create Post
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<PostList>
                    columns={header}
                    data={data?.data}
                    loading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Pagination
              currentPage={data!?.meta.currentPage}
              totalPages={data!?.meta.totalPages}
              onPageChange={handlePageChange}
            />
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
    </ContentContainer>
  );
}
