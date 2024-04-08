import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline } from "react-icons/md";
import { errorHandler } from "services/errorHandler";
import moment from "moment";
import { Comment } from "_interfaces/comment.interface";
import {
  useCommentListQuery,
  useDeleteCommentMutation,
} from "services/modules/comment";
import DetailPostCard from "components/post/DetailPostCard";

export const detailPostRouteName = "post/:id";
export default function DetailPostPage(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    limit: 10,
    page: 1,
  });
  const { data, isLoading, refetch } = useCommentListQuery({
    ...searchParams,
    id: id as string,
  });
  const [deleteComment] = useDeleteCommentMutation();
  const handleCreateComment = (): void => {
    void navigate("/comment/create");
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
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  void handleDeleteComment(data?.id as string);
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
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex mb-4">
            <h3 className="text-2xl text-black font-semibold">Detail Post</h3>
          </div>
          <DetailPostCard />
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
            {data!?.metadata ? (
              <Pagination
                currentPage={data!?.metadata.currentPage}
                totalPages={data!?.metadata.totalPage}
                onPageChange={handlePageChange}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
