import React, { Fragment } from "react";
import { Button, Modal } from "react-daisyui";
import { IoClose } from "react-icons/io5";

interface props {
  openFilter: boolean;
  handleOpenFilter: () => void;
}
export default function ModalFilterPaymentHistory({
  openFilter,
  handleOpenFilter,
}: props): React.ReactElement {
  const typeMembership = [
    "Lifetime",
    "3 Month Subscription",
    "6 Month Subscription",
  ];
  const typeMethod = ["Bank Transfer", "E-Wallet"];

  const optionsMembership = [
    {
      key: 0,
      label: "Choose Type",
      data: "test",
    },
    ...Object.values(typeMembership).map((category, idx) => {
      return {
        key: idx + 1,
        label: category,
        data: "test",
      };
    }),
  ];

  const optionsMethod = [
    {
      key: 0,
      label: "Choose Type",
      data: "test",
    },
    ...Object.values(typeMethod).map((category, idx) => {
      return {
        key: idx + 1,
        label: category,
        data: "test",
      };
    }),
  ];

  return (
    <Fragment>
      <Modal backdrop={false} open={openFilter} className="bg-white">
        <Modal.Header className="flex flex-row justify-between">
          Filter
          <IoClose onClick={handleOpenFilter} />{" "}
        </Modal.Header>
        <Modal.Body className="h-[25rem] overflow-scroll">
          <div className="grid gap-6">
            <div>
              <p className="text-black text-base font-semibold mb-3">
                Membership
              </p>
              {/* <Select
                name="type"
                placeholder="Choose Membership"
                options={optionsMembership}
              /> */}
            </div>

            <div>
              <p className="text-black text-base font-semibold mb-3">Method</p>
              {/* <Select
                name="type"
                placeholder="Choose Method"
                options={optionsMethod}
              /> */}
            </div>

            <div className="">
              <p className="mb-2 text-black text-base font-semibold">Time</p>
              <div className="grid grid-cols-2 gap-4">
                <p className="mb-2 text-black text-base font-semibold">Start</p>
                <p className="mb-2 text-black text-base font-semibold">End</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* <Date
                  name="publishTime"
                  onChange={handleChangeDate}
                  placeholder="Choose Start"
                />
                <Date
                  name="publishTime"
                  onChange={handleChangeDate}
                  placeholder="Choose End"
                /> */}
              </div>
            </div>

            <div>
              <section className="flex flex-col">
                <p className="text-black text-base font-semibold mb-3">
                  Status
                </p>
                <section className="flex flex-row gap-3">
                  <section className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg">
                    <input type="checkbox" name="" id="" />
                    <p className="text-[#262626] text-base font-normal">
                      Failed
                    </p>
                  </section>
                  <section className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg">
                    <input type="checkbox" name="" id="" />
                    <p className="text-[#262626] text-base font-normal">
                      Pending
                    </p>
                  </section>
                  <section className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg">
                    <input type="checkbox" name="" id="" />
                    <p className="text-[#262626] text-base font-normal">
                      Success
                    </p>
                  </section>
                </section>
              </section>
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            onClick={handleOpenFilter}
            className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
          >
            Clear
          </Button>
          <Button
            onClick={handleOpenFilter}
            className="rounded-full border bg-[#3AC4A0] text-white font-semibold"
          >
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
