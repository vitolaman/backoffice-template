// import { OptionFilter } from "_interfaces/circle.interface";
import React, { Fragment } from "react";
import { Button, Modal } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import ReactSelect from "react-select";
interface props {
  modalStatus: boolean;
  handleModalStatus: () => void;
}
export interface OptionFilter {
  key: number;
  label: string;
  value: string;
}
export default function ModalChangeStatusTokenReport({
  modalStatus,
  handleModalStatus,
}: props): React.ReactElement {
  const typeFilter = ["Pending", "Solved", "To-Do"];

  const options: OptionFilter[] = [
    ...Object.values(typeFilter).map((category, idx) => {
      return {
        key: idx + 1,
        label: category,
        value: "test",
      };
    }),
  ];

  return (
    <Fragment>
      <Modal
        backdrop={false}
        open={modalStatus}
        className="bg-white min-h-[300px]"
      >
        <Modal.Header className="flex flex-row justify-between">
          Change Status
          <IoClose onClick={handleModalStatus} />{" "}
        </Modal.Header>

        <Modal.Body>
          <div className="grid gap-6">
            <p className="text-black text-base font-semibold -mb-3">Status</p>
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
              // value={options?.find((item) => item.value === filter.type)}
              // onChange={(e) => changeFilterType(e as OptionFilter)}
            />
          </div>
        </Modal.Body>

        <Modal.Actions className="flex flex-col justify-end h-full">
          <div className="flex justify-end">
            <Button
              onClick={handleModalStatus}
              className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
            >
              Clear
            </Button>
            <Button
              onClick={handleModalStatus}
              className="rounded-full border bg-[#3AC4A0] text-white font-semibold hover:bg-[#3AC4A0]/90"
            >
              Submit
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
