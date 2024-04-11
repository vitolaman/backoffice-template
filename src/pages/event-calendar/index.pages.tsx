import React, { useState } from 'react';
import { EventListReq, Event } from '_interfaces/event-calendar.interfaces'; 
import SearchInput from 'components/search-input';
import { Columns, Table } from "components/table/table";
import Pagination from 'components/table/pagination';
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Button } from 'react-daisyui';
import { MdDelete, MdModeEditOutline, MdVisibility } from "react-icons/md";
import CreateModalForm from './createModal.pages';
import UpdateEventModal from './editModal.pages';
import { useDeleteEventMutation, useEventListQuery } from 'services/modules/event-calendar';
import DetailEventModal from './detail.pages';
import moment from "moment";
import { toast } from 'react-toastify';
import { errorHandler } from 'services/errorHandler';
import DeletePopUp from 'components/modal/other/Delete';


const EventCalendarPage: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    
    const [searchParams, setSearchParams] = useState<EventListReq>({
        search: '',
        limit: 10,
        page: 1,
    });

    const { data, refetch, isLoading } = useEventListQuery(searchParams);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

    const [idEvent, setIdEvent] = useState('');

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsDeleteConfirmation(false);
        setIsDetailModalOpen(false);
        setIdEvent('');
    };

    const closeModalSuccess = () => {
        refetch();
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsDeleteConfirmation(false);
        setIsDetailModalOpen(false);
        setIdEvent('');
    }
    
    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const openEditModal = (id: string) => {
        setIdEvent(id);
        setIsUpdateModalOpen(true);
    }; 

    const openDetailModal = async (id: string): Promise<void> => {
        try {
          await setIdEvent(id);
          setIsDetailModalOpen(true);
        } catch (error) {
          console.log(error);
        }
      };

    const handleDeletePopUp = () => {
        setIsDeleteConfirmation(!isDeleteConfirmation);
    };

    const [deleteEventServices] = useDeleteEventMutation();

    const handleDelete = async (id: string): Promise<void> => {
      try {
        await deleteEventServices({id});
        toast.success('Event deleted successfully'); 
        closeModal();
      } catch (error) {
        errorHandler(error);
        console.error('Error:', error);
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
            render: (data) => <p>{data?.title}</p>,
        },
        {
            fieldId: "date",
            label: "Date",
            render: (data) => <p>{moment(data?.created_at).format("MMM Do YY")}</p>,},
        {
            fieldId: "location",
            label: "Location",
            render: (data) => <p>{data?.location}</p>,
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
                            void openDetailModal(data?.id as string);
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
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl text-[#262626] font-semibold">Event List</h3>
                <div className="flex items-center justify-between gap-4 ml-4">
                <SearchInput
                    placeholder="Search"
                    onSubmit={({ text }) => {
                    setSearchParams((prev) => ({ ...prev, search: text }));
                    }}
                />
                <button
                    onClick={openCreateModal}
                    className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-san-juan text-white hover:bg-san-juan/90"
                >
                    Create Event
                </button>
                </div>
            </div>
            </div>
            <div className="col-span-1">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                    <Table
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
            <div>
            </div>
            </div>
        </div>

        <CreateModalForm
            open={isCreateModalOpen}
            onClose={closeModal}
            onCloseSuccess={closeModalSuccess}
        />
        
        {idEvent !== '' &&
            <DetailEventModal
                open={isDetailModalOpen}
                onClose={closeModal}
                id={idEvent}
            />
        }

        {idEvent !== '' &&
            <UpdateEventModal
                open={isUpdateModalOpen}
                onClose={closeModal}
                onCloseSuccess={closeModalSuccess}
                id={idEvent}
            /> 
        }

        {idEvent !== '' &&
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
        }
        </div>
    );
}

export default EventCalendarPage;
