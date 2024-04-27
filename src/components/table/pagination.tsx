import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<number>(currentPage ?? 0);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputPage(+e.target.value);
  };

  const handlePageChange = (): void => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
    } else {
      setInputPage(currentPage ?? 0);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageButtonClick = (page: number): void => {
    onPageChange(page);
  };

  const generatePageButtons = (): React.ReactNode => {
    const buttons = [];
    const maxButtons = 7;
    const halfMaxButtons = Math.floor(maxButtons / 2);
    let start: number = Math.max(1, currentPage - halfMaxButtons);
    const end: number = Math.min(start + maxButtons - 1, totalPages);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <a
          key={i}
          href="#"
          className={`${
            i === currentPage ? "text-white bg-san-juan" : "text-[#262626]"
          } rounded-full w-6 h-6 mx-2 inline-flex justify-center items-center text-xs`}
          onClick={() => {
            handlePageButtonClick(i);
          }}
        >
          {i}
        </a>
      );
    }

    return buttons;
  };

  return (
    <div className="grid grid-cols-10 gap-4 mt-16">
      <div className="col-span-2" />
      <div className="col-span-6 pt-[1px]">
        <div className="flex justify-center items-center">
          <a
            href="#"
            onClick={handlePreviousPage}
            className="w-6 h-6 mx-2 text-[#262626] inline-flex justify-center items-center"
          >
            <FaChevronLeft className="h-4 w-4 text-[#262626]" />
          </a>
          {generatePageButtons()}
          <a
            href="#"
            onClick={handleNextPage}
            className="w-6 h-6 mx-2 text-[#262626] inline-flex justify-center items-center"
          >
            <FaChevronRight className="h-4 w-4 text-[#262626]" />
          </a>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex justify-center items-center gap-4">
          <div className="flex-none">
            <div className="text-xs h-[23px] leading-[23px] block text-[#BDBDBD]">
              Go to page
            </div>
          </div>
          <div className="flex-1">
            <input
              onChange={handleInputChange}
              value={inputPage ?? 0}
              type="text"
              className="rounded-full border border-[#3AC4A0] block w-full px-2 text-[#262626] text-sm h-[23px] placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
          <div className="flex-1">
            <button
              type="button"
              onClick={handlePageChange}
              className="inline-flex items-center px-4 h-[23px] border border-transparent text-xs font-semibold rounded-full text-white bg-san-juan"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
