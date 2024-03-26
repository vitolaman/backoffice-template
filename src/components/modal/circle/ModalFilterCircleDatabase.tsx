import { CircleReq, OptionFilter } from "_interfaces/circle.interface";
import CInput from "components/input";
import { typeFilter } from "data/circle";
import moment from "moment";
import React, { ChangeEvent, Fragment, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import ReactSelect from "react-select";

interface props {
  openFilter: boolean;
  handleOpenFilter: () => void;
  filter: CircleReq;
  changeDateFrom: (createdAtFrom: string) => void;
  changeDateTo: (createdAtTo: string) => void;
  clearFilter: () => void;
  changeFilterType: (data: OptionFilter) => void;
  changeFilter: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ModalFilterCircleDatabase({
  openFilter,
  handleOpenFilter,
  changeFilter,
  filter,
  changeFilterType,
  changeDateFrom,
  changeDateTo,
  clearFilter,
}: props): React.ReactElement {
  const options: OptionFilter[] = [
    ...Object.values(typeFilter).map((category, idx) => {
      return {
        key: idx + 1,
        label: category.label,
        value: category.value,
      };
    }),
  ];

  const [search, setSearch] = useState<string>("");

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
              <p className="text-black text-base font-semibold -mb-3">Type</p>
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
                options={options}
                isSearchable={true}
                onInputChange={(e) => {
                  setSearch(e);
                }}
                value={options?.find((item) => item.value === filter.type)}
                onChange={(e) => changeFilterType(e as OptionFilter)}
              />
              <div className="">
                <p className="mb-2 text-black text-base font-semibold">
                  Created At
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <p className="mb-2 text-black text-base font-semibold">
                    Start
                  </p>
                  <p className="mb-2 text-black text-base font-semibold">End</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mx-1">
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

              <div className="">
                <p className="text-black text-base font-semibold mb-2">
                  Members
                </p>
                <div className="grid grid-cols-2 gap-4 m-1">
                  <CInput
                    type="number"
                    name="total_member_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_member_from}
                  />
                  <CInput
                    type="number"
                    name="total_member_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_member_to}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">Post</p>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="number"
                    name="total_post_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_post_from}
                  />
                  <CInput
                    type="number"
                    name="total_post_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_post_to}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">Like</p>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="number"
                    name="total_like_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_like_from}
                  />
                  <CInput
                    type="number"
                    name="total_like_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_like_to}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">Share</p>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="number"
                    name="total_share_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_share_from}
                  />
                  <CInput
                    type="number"
                    name="total_share_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_share_to}
                  />
                </div>
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
