import React, { useState } from "react";
import { EventListReq, Event } from "_interfaces/event-calendar.interfaces";
import SearchInput from "components/search-input";
import { Columns, Table } from "components/table/table";
import Pagination from "components/table/pagination";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Button } from "react-daisyui";
import { MdBlock, MdDelete, MdVisibility } from "react-icons/md";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import DeletePopUp from "components/modal/other/Delete";
import { useNavigate } from "react-router-dom";
import { User } from "_interfaces/user-management.interfaces";
import { useActiveUserListQuery, useDeleteUserMutation } from "services/modules/user-management";

const ActiveUserPage: React.FC = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useState<EventListReq>({
    search: "",
    limit: 10,
    page: 1,
  });

  const { data, refetch, isLoading } = useActiveUserListQuery(searchParams);

  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleDeletePopUp = () => {
    setIsDeleteConfirmation(!isDeleteConfirmation);
  };

  const [deleteUserServices] = useDeleteUserMutation();

  const handleDelete = async (id: string): Promise<void> => {
    try {
        await deleteUserServices({ id });
        refetch();
        toast.success("User deleted successfully");
    } catch (error) {
        errorHandler(error);
        console.error("Error:", error);
    }
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const header: Columns<User>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Name",
      render: (data) => (
        <p
          onClick={() => {
            navigate(`/user/${data?.id}`);
          }}
          className="underline hover:text-blue-300 cursor-pointer"
        >
          {data?.name}
        </p>
      ),
    },
    {
      fieldId: "email",
      label: "Email",
    },
    {
      fieldId: "gender",
      label: "Gender",
      render: (data) => (
        <p>{data?.gender === 'l' ? 'male' : 'female'}</p>
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
                  navigate(`/user/${data?.id}`);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <MdVisibility className="mt-1 me-3 h-4 w-4" />
                  See Detail
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  setSelectedUser(data?.id as string);
                  handleDeletePopUp();
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdBlock className="mt-1 me-3 h-4 w-4" />
                  Block User
                </label>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <div>
      <DeletePopUp
        isOpen={isDeleteConfirmation}
        data={"User"}
        onClose={handleDeletePopUp}
        onEdit={() => {
          handleDeletePopUp();
          void handleDelete(selectedUser);
        }}
        menu="User"
      />
      <div className="grid grid-cols-1 gap-6 mt-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Active User List
            </h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setSearchParams((prev) => ({ ...prev, search: text }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<User>
                    columns={header}
                    data={data!?.data.data}
                    loading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Pagination
              currentPage={data!?.data.meta.currentPage}
              totalPages={data!?.data.meta.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUserPage;
