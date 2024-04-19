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
import { MdDelete, MdModeEditOutline, MdVisibility } from "react-icons/md";
import CreateModalForm from "./createModal.pages";
import UpdateEventModal from "./editModal.pages";
import {
  useDeleteEventMutation,
  useEventListQuery,
} from "services/modules/event-calendar";
import moment from "moment";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import DeletePopUp from "components/modal/other/Delete";
import ContentContainer from "components/container";
import { useNavigate } from "react-router-dom";

const EventCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useState<EventListReq>({
    search: "",
    limit: 10,
    page: 1,
  });

  const { data, refetch, isLoading } = useEventListQuery(searchParams);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const [idEvent, setIdEvent] = useState("");

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteConfirmation(false);
    setIdEvent("");
  };

  const closeModalSuccess = () => {
    refetch();
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteConfirmation(false);
    setIdEvent("");
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setIdEvent(id);
    setIsUpdateModalOpen(true);
  };

  const handleDeletePopUp = () => {
    setIsDeleteConfirmation(!isDeleteConfirmation);
  };

  const [deleteEventServices] = useDeleteEventMutation();

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteEventServices({ id });
      toast.success("Event deleted successfully");
      closeModal();
    } catch (error) {
      errorHandler(error);
      console.error("Error:", error);
    }
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const header: Columns<Event>[] = [
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
            navigate(`/event/${data?.id}`);
          }}
          className="underline hover:text-blue-300 cursor-pointer"
        >
          {data?.title}
        </p>
      ),
    },
    {
      fieldId: "date",
      label: "Date",
      render: (data) => <p>{moment(data?.date).format("MMM Do, YYYY")}</p>,
    },
    {
      fieldId: "location",
      label: "Location",
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
                  navigate(`/event/${data?.id}`);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <MdVisibility className="mt-1 me-3 h-4 w-4" />
                  View
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  void openEditModal(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <MdModeEditOutline className="mt-1 me-3 h-4 w-4" />
                  Edit
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  setIdEvent(data?.id as string);
                  handleDeletePopUp();
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdDelete className="mt-1 me-3 h-4 w-4" />
                  Delete
                </label>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <ContentContainer>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Event List
            </h3>
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
                onClick={openCreateModal}
                className="bg-san-juan text-white hover:bg-san-juan/90"
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<Event>
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
          <div></div>
        </div>
      </div>

      <CreateModalForm
        open={isCreateModalOpen}
        onClose={closeModal}
        onCloseSuccess={closeModalSuccess}
      />

      {idEvent !== "" && (
        <UpdateEventModal
          open={isUpdateModalOpen}
          onClose={closeModal}
          onCloseSuccess={closeModalSuccess}
          id={idEvent}
        />
      )}

      {idEvent !== "" && (
        <DeletePopUp
          isOpen={isDeleteConfirmation}
          data={"Event"}
          onClose={closeModal}
          onEdit={() => {
            handleDeletePopUp();
            void handleDelete(idEvent);
            closeModalSuccess();
          }}
          menu="Event"
        />
      )}
    </ContentContainer>
  );
};

export default EventCalendarPage;
