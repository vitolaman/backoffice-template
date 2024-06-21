import React, { useState } from "react";
import SearchInput from "components/search-input";
import { Columns, Table } from "components/table/table";
import Pagination from "components/table/pagination";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Button, Modal } from "react-daisyui";
import { MdDelete, MdVisibility } from "react-icons/md";
import moment from "moment";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import ContentContainer from "components/container";
import { Report, ReportListReq } from "_interfaces/report.interfaces";
import {
  useDeleteReportMutation,
  useReportDetailQuery,
  useReportListQuery,
  useVerifyReportMutation,
} from "services/modules/report";
import DeletePopUp from "components/modal/other/Delete";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const reportPageRoutename = "/report";
const ReportPage: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<ReportListReq>({
    search: "",
    limit: 10,
    page: 1,
  });
  const [idReport, setIdReport] = useState("");
  const { data, refetch, isLoading } = useReportListQuery(searchParams);
  const {
    data: reportDetail,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useReportDetailQuery({ id: idReport });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsDeleteConfirmation(false);
    setIdReport("");
  };

  const handleDeletePopUp = () => {
    setIsDeleteConfirmation(!isDeleteConfirmation);
  };

  const [deleteEventServices] = useDeleteReportMutation();
  const [verifyReport] = useVerifyReportMutation();

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteEventServices({ id });
      toast.success("Report deleted successfully");
      handleDeletePopUp();
    } catch (error) {
      errorHandler(error);
      console.error("Error:", error);
    }
  };

  const handleVerify = async (
    id: string,
    status: "approved" | "rejected"
  ): Promise<void> => {
    try {
      await verifyReport({ reportId: id, status });
      await refetch();
      await refetchDetail();
      toast.success(`Report ${status}`);
      setIsDetailModalOpen(false);
    } catch (error) {
      errorHandler(error);
      console.error("Error:", error);
    }
  };

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  const header: Columns<Report>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "reason",
      label: "Reason",
      render: (data) => (
        <p>
          {data?.reason !== undefined && data?.reason.length > 25
            ? data?.reason.slice(0, 25) + "..."
            : data?.reason}
        </p>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
    },
    {
      fieldId: "created_at",
      label: "Reported At",
      render: (data) => (
        <p>{moment(data?.created_at).format("MMM Do, YYYY")}</p>
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
                  setIsDetailModalOpen(true);
                  setIdReport(data?.id as string);
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
                  setIdReport(data?.id as string);
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
              Report List
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
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<Report>
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
      <Modal
        open={isDetailModalOpen}
        backdrop={false}
        className="flex flex-col justify-center items-center bg-white"
      >
        <Modal.Header className="flex flex-col items-center">
          <h1 className="text-2xl text-center font-semibold">Detail Report</h1>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4 w-full">
          <div className="flex flex-col w-full justify-start gap-1">
            <h1 className="text-lg text-start font-semibold">Report Reason</h1>
            {isLoadingDetail ? (
              <p>Loading...</p>
            ) : (
              <p className="text-base font-normal">
                {reportDetail?.data.reason}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full justify-start gap-1">
            <h1 className="text-lg text-start font-semibold">Status</h1>
            {isLoadingDetail ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-2">
                {reportDetail?.data.status === "approved" ? (
                  <CheckIcon className="w-6 h-6 text-success-700" />
                ) : reportDetail?.data.status === "rejected" ? (
                  <XMarkIcon className="w-6 h-6 text-red-600" />
                ) : (
                  <ClockIcon className="w-6 h-6" />
                )}
                <p className="text-base font-normal capitalize">
                  {reportDetail?.data.status}
                </p>
              </div>
            )}
          </div>
          {reportDetail?.data.status === "pending" && (
            <div className="flex flex-col w-full justify-start gap-3">
              <h1 className="text-lg text-start font-semibold">Action</h1>
              {isLoadingDetail ? (
                <p>Loading...</p>
              ) : (
                <div className="flex justify-around w-full">
                  <Button
                    type="button"
                    className="w-[45%] rounded-md text-red-600 hover:bg-red-600 hover:text-white bg-white/90"
                    onClick={() => handleVerify(idReport, "rejected")}
                  >
                    <div className="flex items-center gap-2">
                      <XMarkIcon className="w-6 h-6" />
                      <p className="">Reject</p>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    className="w-[45%] rounded-md text-success hover:bg-success hover:text-white bg-white/90"
                    onClick={() => handleVerify(idReport, "approved")}
                  >
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-6 h-6" />
                      <p className="">Approve</p>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Actions className="flex w-full flex-col items-center">
          <Button
            type="button"
            className="w-[100%] rounded-full hover:text-san-juan mt-2 bg-san-juan text-white hover:bg-white/90 hover:border-san-juan"
            onClick={() => {
              setIsDetailModalOpen(false);
              setIdReport("");
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      {idReport !== "" && (
        <DeletePopUp
          isOpen={isDeleteConfirmation}
          data={"Report"}
          onClose={closeModal}
          onEdit={async () => {
            await handleDelete(idReport);
            await refetch();
          }}
          menu="Report"
        />
      )}
    </ContentContainer>
  );
};

export default ReportPage;
