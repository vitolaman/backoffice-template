import React, { useEffect, useState } from 'react';
import { EventList, EventListReq, Event } from '_interfaces/event-calendar.interfaces'; 
import SearchInput from 'components/search-input';
import { Columns, Table } from "components/table/table";
import Pagination from 'components/table/pagination';
import { dummyEvents } from '../../data/event-calendar';
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Button } from 'react-daisyui';
import { MdDelete, MdModeEditOutline, MdVisibility } from "react-icons/md";
import CreateModalForm from './createModal.pages';
import UpdateEventModal from './editModal.pages';
import DeleteEventModal from './deleteConfirmation.pages';
import { useEventListQuery } from 'services/modules/event-calendar';
import { fetchAllEvents, fetchEventById, searchEvents } from 'services/modules/event-calendar/dummyData';
import DetailEventModal from './detail.pages';

const EventCalendarPage: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [events, setEvents] = useState<EventList>(dummyEvents.data);
    const [searchParams, setSearchParams] = useState<EventListReq>({
        search: '',
        limit: 10,
        page: 1,
    });

    // const { refetch } = useEventListQuery(searchParams);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const searchedEvents = await searchEvents(searchParams);
            setEvents(searchedEvents);
        };
        fetchEvents();
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const data = await fetchAllEvents();
            setEvents(data);
          } catch (error) {
            console.error('Error fetching events:', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

    const [idEvent, setIdEvent] = useState("");

    const closeModal = () => {
        setIsModalOpen(false);
        setIsDeleteConfirmation(false);
        setIsDetailModalOpen(false);
        setSelectedEvent(undefined);
    };
    
    const openCreateModal = () => {
        setIsModalOpen(true);
    };

    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);

    const openDetailModal = async (id: string) => {
        try {
            const event = await fetchEventById(id);
            setSelectedEvent(event);
            setIsDetailModalOpen(true);
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    }; 

    const openEditModal = async (id: string) => {
        try {
            const event = await fetchEventById(id);
            setSelectedEvent(event);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    }; 

    
    const openDeleteModal = (id: string) => {
        setIsDeleteConfirmation(true);
        setIdEvent(id);
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
            render: (data) => <p>{data?.date.toString()}</p>,},
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
                        void openDeleteModal(data?.id as string);
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
                    className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]/90"
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
                        data={events}
                        loading={isLoading}
                        />
                    </div>
                </div>
                </div>
            </div>
            <div className="flex flex-col">
                <Pagination
                currentPage={dummyEvents!?.metadata.currentPage}
                totalPages={dummyEvents!?.metadata.totalPage}
                onPageChange={handlePageChange}
                />
            </div>
            <div>
            </div>
            </div>
        </div>

        <CreateModalForm
            open={isModalOpen}
            onClose={() => closeModal()}
        />
        
        {selectedEvent && (
            <DetailEventModal
                open={isDetailModalOpen}
                onClose={closeModal}
                eventData={selectedEvent}
            />
        )}

        {selectedEvent && (
            <UpdateEventModal
                open={isModalOpen}
                onClose={closeModal}
                eventData={selectedEvent}
            />
        )}
        
        <DeleteEventModal
            open={isDeleteConfirmation}
            onClose={closeModal}
            id={idEvent}
        />
        
        </div>
    );
}

export default EventCalendarPage;
