import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Card,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline } from "react-icons/md";
import { errorHandler } from "services/errorHandler";
import { data } from "data/comment";
import { data as postData } from "data/post";
import moment from "moment";
import { Comment, CommentListReq } from "_interfaces/comment.interface";
import { useCommentListQuery } from "services/modules/comment";
import { useDeletePostMutation } from "services/modules/post";
import DetailPostCard from "components/post/DetailPostCard";

export const detailPostRouteName = "post/:id";
export default function DetailPostPage(): React.ReactElement {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<CommentListReq>({
    limit: 10,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { refetch } = useCommentListQuery(searchParams);
  const [deleteBanner] = useDeletePostMutation();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  const postDetail = postData.data[0];
  const handleCreateComment = (): void => {
    void navigate("/comment/create");
  };

  const handleDeleteComment = async (id: string): Promise<void> => {
    try {
      const statusUpdated = { id };
      await deleteBanner(statusUpdated);
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
      fieldId: "id",
      label: "Comment ID",
    },
    {
      fieldId: "name",
      label: "Publisher Name",
      render: (data) => <p>{data?.issuer.name}</p>,
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
                className="rounded text-center text-lg hover:bg-transparent text-[#3AC4A0] border-none"
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
          <DetailPostCard postDetail={postDetail} />
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-black font-semibold">Comment List</h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setSearchParams((prev) => ({ ...prev, search: text }));
                }}
              />
              <button
                onClick={() => {
                  handleCreateComment();
                }}
                className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]/90"
              >
                Create Comment
                <ChevronDownIcon
                  className="-mr-1 -mb-1 h-5 w-5 text-white "
                  aria-hidden="true"
                />
              </button>
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
            <Pagination
              currentPage={data!?.metadata.currentPage}
              totalPages={data!?.metadata.totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
