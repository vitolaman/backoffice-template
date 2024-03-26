import type {
  CircleOwner,
  OptionFilter,
  TokenReportReq,
} from "_interfaces/circle.interface";
import CInput from "components/input";
import { typeStatus, typeTicket } from "data/circle";
import moment from "moment";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import ReactSelect from "react-select";
import { useOwnerCircleListQuery } from "services/modules/circle";

interface props {
  openFilter: boolean;
  handleOpenFilter: () => void;
  filter: TokenReportReq;
  changeDateFrom: (createdAtFrom: string) => void;
  changeDateTo: (createdAtTo: string) => void;
  clearFilter: () => void;
  changeFilterTicket: (data: OptionFilter) => void;
  changeFilterCircleOwner: (data: OptionFilter) => void;
  changeFilterStatus: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default function ModalFilterTokenReport({
  openFilter,
  handleOpenFilter,
  filter,
  changeDateFrom,
  changeDateTo,
  clearFilter,
  changeFilterTicket,
  changeFilterCircleOwner,
  changeFilterStatus,
}: props): React.ReactElement {
  const [optionsOwner, setOptionsOwner] = useState<OptionFilter[]>([]);
  const { data, isLoading } = useOwnerCircleListQuery({ page: 1, limit: 200 });

  const optionsTicket = [
    ...Object.values(typeTicket).map((type, idx) => {
      return {
        key: idx + 1,
        label: type.label,
        value: type.value,
      };
    }),
  ];

  const handleOptionOwner = (ownerData: CircleOwner[]): void => {
    const newOwner = ownerData?.map((data, idx) => {
      return {
        key: idx + 1,
        label: data.name,
        value: data.id,
      };
    });

    setOptionsOwner(newOwner);
  };

  useEffect(() => {
    handleOptionOwner(data?.data as CircleOwner[]);
  }, [data]);

  return (
    <Fragment>
      {filter && filter.created_at_from !== undefined && (
        <Modal backdrop={false} open={openFilter} className="bg-white">
          <Modal.Header className="flex flex-row justify-between">
            Filter
            <IoClose onClick={handleOpenFilter} />{" "}
          </Modal.Header>
          <Modal.Body className="h-[25rem] overflow-scroll">
            <div className="grid gap-6">
              <div>
                <p className="text-black text-base font-semibold mb-3">
                  Ticket
                </p>
                <ReactSelect
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      padding: 2,
                      margin: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: "0.5rem",
                    }),
                  }}
                  options={optionsTicket}
                  isSearchable={true}
                  value={optionsTicket?.find(
                    (item) => item.value === filter.ticket
                  )}
                  onChange={(e) => changeFilterTicket(e as OptionFilter)}
                />
              </div>

              <div className="">
                <p className="mb-2 text-black text-base font-semibold">
                  Reported At
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <p className="mb-2 text-black text-base font-semibold">
                    Start
                  </p>
                  <p className="mb-2 text-black text-base font-semibold">End</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CInput
                    type="datetime-local"
                    onChange={(e) => {
                      changeDateFrom(
                        moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                      );
                    }}
                    value={moment(filter.created_at_from)
                      .utc(true)
                      .format("YYYY-MM-DD HH:mm")}
                  />
                  <CInput
                    type="datetime-local"
                    onChange={(e) => {
                      changeDateTo(
                        moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                      );
                    }}
                    value={moment(filter.created_at_to)
                      .utc(true)
                      .format("YYYY-MM-DD HH:mm")}
                  />
                </div>
              </div>

              <div>
                <p className="text-black text-base font-semibold mb-3">
                  Circle Owner
                </p>
                <ReactSelect
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      padding: 2,
                      margin: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: "0.5rem",
                    }),
                  }}
                  options={optionsOwner}
                  isSearchable={true}
                  value={optionsOwner?.find(
                    (item) => item.value === filter.circle_owner_id
                  )}
                  onChange={(e) => changeFilterCircleOwner(e as OptionFilter)}
                  isLoading={isLoading}
                />
              </div>
              <div>
                <section className="flex flex-col">
                  <p className="text-black text-base font-semibold mb-3">
                    Status
                  </p>

                  <section className="flex flex-row gap-3">
                    {typeStatus.map((data, key) => (
                      <section
                        key={key}
                        className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg"
                      >
                        <input
                          type="checkbox"
                          name={data.label}
                          value={data.value}
                          onChange={changeFilterStatus}
                        />

                        <p className="text-[#262626] text-base font-normal">
                          {data.label}
                        </p>
                      </section>
                    ))}
                  </section>
                </section>
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              onClick={clearFilter}
              className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
            >
              Clear
            </Button>
            <Button
              onClick={handleOpenFilter}
              className="rounded-full border bg-[#3AC4A0] text-white font-semibold hover:bg-[#3AC4A0]/90"
            >
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Fragment>
  );
}
