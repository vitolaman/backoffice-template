import React, { useState } from "react";
import { EventListReq, Event } from "_interfaces/event-calendar.interfaces";
import SearchInput from "components/search-input";
import { Columns, Table } from "components/table/table";
import Pagination from "components/table/pagination";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { User } from "_interfaces/user-management.interfaces";
import { usePendingUserListQuery, useVerifyUserMutation } from "services/modules/user-management";
import SavePopUp from "components/modal/other/Save";
import RejectPopUp from "./reject";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";

const PendingUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);

  const [searchParams, setSearchParams] = useState<EventListReq>({
    search: "",
    limit: 10,
    page: 1,
  });

  const { data, refetch, isLoading } = usePendingUserListQuery(searchParams);

  const [selectedUser, setSelectedUser] = useState<string>("");

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const [verifyUserServices] = useVerifyUserMutation();
  
  const handleApprove = async (id: string) => {
    try {
      await verifyUserServices({userId: id, type: "approved"});
      refetch();
      toast.success("User activated successfully!");
    } catch (error) {
      errorHandler(error);
      console.error("Error activating user:", error);
    }
  };
  
  const handleReject = async (id: string) => {
      try {
        await verifyUserServices({userId: id, type: "rejected"});
        refetch();
        console.log("User rejected successfully!");
      } catch (error) {
        errorHandler(error);
        console.error("Error rejecting user:", error);
      }
    };
  
  const handleApprovePopup = () => {
      setIsApprovePopupOpen(!isApprovePopupOpen);
  };
  
  const handleRejectPopUp = () => {
      setIsRejectPopupOpen(!isRejectPopupOpen);
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
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <p className={`rounded-full border ${data?.status === 'pending' ? 'text-yellow-900 border-yellow-900' : data?.status === 'rejected' ? 'text-red-900 border-red-900' : 'text-green-900 border-green-900'}`}>          
            {data?.status}
        </p>
      ),
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <div>
          <Button
              type="button"
              onClick={() => {
                setSelectedUser(data?.id as string);
                void handleApprovePopup();
              }}
              loading={isLoading}
              disabled={data?.status === "rejected"}
              className="px-4 bg-[#3AC4A0]/80 text-white hover:bg-[#3AC4A0]"
            >
              Approve
            </Button>
            <Button
              type="button"
              onClick={() => {
                setSelectedUser(data?.id as string);
                void handleRejectPopUp();
              }}
              disabled={data?.status === "rejected"}
              className="ml-4 px-6 bg-red-500/80 text-white hover:bg-red-800"
            >
              Reject
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 mt-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Pending User List
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
      <SavePopUp
            isOpen={isApprovePopupOpen}
            data={"Approve"}
            onClose={handleApprovePopup}
            onEdit={() => {
                setIsApprovePopupOpen(false);
                void handleApprove(selectedUser);
            }}
            menu={"User"}
       />

        <RejectPopUp
            isOpen={isRejectPopupOpen}
            data={"Reject"}
            onClose={handleRejectPopUp}
            onEdit={() => {
                setIsRejectPopupOpen(false);
                void handleReject(selectedUser);
            }}
            menu={"User"}
        />
    </div>
  );
};

export default PendingUserPage;
