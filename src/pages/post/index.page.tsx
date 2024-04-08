import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { PostList, PostListReq } from "_interfaces/post.interface";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline } from "react-icons/md";
import { errorHandler } from "services/errorHandler";
import moment from "moment";
import { useDeletePostMutation, usePostListQuery } from "services/modules/post";
import { PDF } from "assets/images";
import PDFViewer from "components/post/PDFViewer";
import { EyeIcon } from "@heroicons/react/24/outline";

export const postRouteName = "post";
export default function PostPage(): React.ReactElement {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<PostListReq>({
    search: "",
    limit: 10,
    page: 1,
  });
  const [modalPDF, setModalPDF] = useState<boolean>(false);
  const [file, setFile] = useState("");
  const { data, isLoading, refetch } = usePostListQuery(searchParams);
  const [deletePost] = useDeletePostMutation();

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
              <img src={PDF} alt="pdf" className="w-6 h-6 absolute z-50" />
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
                  void handleDeletePost(data?.id as string);
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
      <PDFViewer
        file={file as string}
        isOpen={modalPDF}
        onClose={() => setModalPDF(false)}
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
    </div>
  );
}
