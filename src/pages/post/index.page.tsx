import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
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
import WarningMaxPopUp from "components/modal/banner/WarningMaxPopUp";
import PopUpImage from "components/modal/banner/PopUpImage";
import {
  BannerList,
  MainBannerReq,
  PostList,
} from "_interfaces/post.interface";
import {
  useBannerListQuery,
  useChangeStatusBannerMutation,
  useDeleteBannerMutation,
} from "services/modules/post";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { errorHandler } from "services/errorHandler";
import { data } from "data/post";
import moment from "moment";

export const postRouteName = "post";
export default function PostPage(): React.ReactElement {
  const push = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<MainBannerReq>({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { refetch } = useBannerListQuery(searchParams);
  const [changeStatusBanner, { error }] = useChangeStatusBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCreateBanner = (): void => {
    void push("/banner/main-banner/create");
  };

  const handleEditBanner = (id: string): void => {
    void push(`/banner/main-banner/update/${id}`);
  };

  const handleClosePopup = () => {
    setIsWarningPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleOpenImage = (url: string) => {
    setSelectedImageUrl(url);
    setIsImagePopupOpen(true);
  };

  const handleUpdateStatusBanner = async (
    id: string,
    status: boolean
  ): Promise<void> => {
    try {
      const statusUpdated = { id, is_active: !status };
      await changeStatusBanner(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteBanner = async (id: string): Promise<void> => {
    try {
      const statusUpdated = { id };
      await deleteBanner(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (error) {
      setIsWarningPopupOpen(true);
      const errorMessage = (
        error as { data: { message: string }; status: number }
      ).data?.message;
      if (errorMessage === "Cannot be more than 10") {
        setWarningMessage("Maximal Banner Active is 10");
      } else if (errorMessage === "Cannot be less than 1") {
        setWarningMessage("Sorry, but there must be 1 Banner to be Set Active");
      } else {
        setWarningMessage(
          "An error occurred while creating the banner. Please try again later."
        );
      }
    }
  }, [error]);

  const header: Columns<PostList>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Post ID",
    },
    {
      fieldId: "name",
      label: "Publisher Name",
      render: (data) => <p>{data?.owner.name}</p>,
    },
    {
      fieldId: "by_admin",
      label: "Published By",
      render: (data) => <p>{data?.by_admin ? "Admin" : "Personal"}</p>,
    },
    {
      fieldId: "owner",
      label: "Business Sector",
      render: (data) => <p>{data?.owner.business_sector}</p>,
    },
    {
      fieldId: "image_url",
      label: "Image",
      render: (data) => (
        <img
          className="mt-1 me-3"
          src={data?.images[0]}
          alt="Success"
          width={100}
          height={100}
          onClick={() => handleOpenImage(data?.images[0] as string)}
        />
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
                className="p-0 w-full"
                onClick={() => {
                  void handleEditBanner(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2"
                >
                  <CiEdit className="mt-1 me-3 h-4 w-4" />
                  Edit Post
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  void handleDeleteBanner(data?.id as string);
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
    <div className="max-w-7xl mx-auto">
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
              <button
                onClick={() => {
                  handleCreateBanner();
                }}
                className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]/90"
              >
                Create Post
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
                  <Table<PostList>
                    columns={header}
                    data={data?.data}
                    loading={isLoading}
                  />
                </div>
                {warningMessage && (
                  <div className={`text-sm text-red-400 font-normal flex my-4`}>
                    <PiWarningCircleFill className="my-auto mr-2" />
                    <span>{warningMessage}</span>
                  </div>
                )}
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
          <div>
            {isWarningPopupOpen && (
              <WarningMaxPopUp
                isOpen={isWarningPopupOpen}
                data={warningMessage}
                onClose={handleClosePopup}
              />
            )}
            {selectedImageUrl && (
              <PopUpImage
                isOpen={isImagePopupOpen}
                data={selectedImageUrl}
                onClose={handleClosePopup}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
