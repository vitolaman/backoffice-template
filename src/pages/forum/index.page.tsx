import React, { useState } from "react";
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
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline } from "react-icons/md";
import { errorHandler } from "services/errorHandler";
import moment from "moment";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import DeletePopUp from "components/modal/other/Delete";
import ContentContainer from "components/container";
import {
  useDeleteForumPostMutation,
  useForumPostListQuery,
} from "services/modules/forum";
import { Forum, ForumPostReq } from "_interfaces/forum.interfaces";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";

export const forumRouteName = "forum";
export default function ForumPage(): React.ReactElement {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<ForumPostReq>({
    search: "",
    limit: 10,
    page: 1,
    endDate: "2084-04-17T17:10:34.640Z",
    startDate: "2014-04-17T17:10:34.640Z",
  });
  const [selectedPost, setSelectedPost] = useState<string>("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { data, isLoading, refetch } = useForumPostListQuery(searchParams);
  const [deleteForumPost] = useDeleteForumPostMutation();
  const handleDeletePopUp = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  const handleCreatePost = (): void => {
    void navigate("/forum/create");
  };

  const handleDeleteForumPost = async (id: string): Promise<void> => {
    try {
      const statusUpdated = { id };
      await deleteForumPost(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const header: Columns<Forum>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "title",
      label: "Title",
      render: (data) => (
        <p
          onClick={() => {
            navigate(`/forum/${data?.id}`);
          }}
          className="underline hover:text-blue-300 cursor-pointer"
        >
          {data?.title !== undefined &&
            (data.title.length > 20
              ? data?.title.slice(0, 15) + "..."
              : data?.title)}
        </p>
      ),
    },
    {
      fieldId: "description",
      label: "Description",
      render: (data) => (
        <p>
          {data?.description !== undefined &&
            (data.description.length > 25
              ? data?.description.slice(0, 20) + "..."
              : data?.description)}
        </p>
      ),
    },
    {
      fieldId: "image",
      label: "Post Image",
      render: (data) => <img src={data?.image} alt="Images" />,
    },
    {
      fieldId: "date",
      label: "Started At",
      render: (data) => (
        <div className="flex items-center gap-2">
          <IoCalendarOutline size={20} />
          <p>{moment(data?.date).utc().format("dddd MMMM Do, YYYY")}</p>
        </div>
      ),
    },
    {
      fieldId: "location",
      label: "Location",
      render: (data) => (
        <div className="flex items-center gap-2">
          <IoLocationOutline size={20} />
          <p>{data?.location}</p>
        </div>
      ),
    },
    {
      fieldId: "created_at",
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
      fieldId: "moderator",
      label: "Moderator",
    },
    {
      fieldId: "admin",
      label: "Posted By",
      render: (data) => <p>{data?.admin.email}</p>,
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
                  navigate(`/forum/${data?.id}`);
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
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  navigate(`/forum/update/${data?.id}`);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <PencilIcon className="mt-1 me-3 h-4 w-4" />
                  Edit Forum Post
                </label>
              </MenuItem>
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
                  Delete Forum Post
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
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data={"Forum Post"}
        onClose={handleDeletePopUp}
        onEdit={() => {
          handleDeletePopUp();
          void handleDeleteForumPost(selectedPost);
        }}
        menu="Forum Post"
      />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Forum Post
            </h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setSearchParams((prev) => ({ ...prev, search: text }));
                }}
              />
              <div className="relative">
                <label className="absolute -top-6 font-semibold">
                  Start Date:
                </label>
                <input
                  type="date"
                  placeholder="Start Date"
                  className="border rounded-full !border-gray-50 p-2"
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="relative">
                <label className="absolute -top-6 font-semibold">
                  End Date:
                </label>
                <input
                  type="date"
                  placeholder="End Date"
                  className="border rounded-full !border-gray-50 p-2"
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                onClick={() => {
                  setSearchParams({
                    search: "",
                    limit: 10,
                    page: 1,
                    endDate: "2084-04-17T17:10:34.640Z",
                    startDate: "2014-04-17T17:10:34.640Z",
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
                Create Forum Post
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<Forum>
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
    </ContentContainer>
  );
}
