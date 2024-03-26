import { isEmpty } from "lodash";

export interface Columns<T> {
  fieldId: string;
  fieldId2?: string;
  fieldId3?: string;
  label: string;
  render?: (data?: T) => React.ReactElement | string;
  renderHeader?: () => React.ReactElement | string;
}

interface Props<T> {
  data?: any[];
  columns: Columns<T>[];
  ranked?: boolean;
  loading?: boolean | null;
  error?: string;
  action?: boolean;
  currentPage?: number;
  limit?: number;
  onRowClick?: (item: T) => void;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Table<T>({
  data = [],
  columns = [],
  ranked = false,
  loading = false,
  error = "",
  action = false,
  currentPage = 1,
  limit = 0,
  onRowClick,
}: Props<T>): React.ReactElement {
  const handleRowClick = (item: T): void => {
    if (onRowClick !== undefined) {
      onRowClick(item);
    }
  };
  return (
    <table className="min-w-full">
      <thead className="bg-[#DCFCE4]">
        <tr className="divide-x divide-[#BDBDBD]">
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
            >
              <div className="flex">
                {column.label}
                {column?.renderHeader !== undefined && column?.renderHeader()}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {loading !== true &&
          isEmpty(error) &&
          !isEmpty(data) &&
          data?.map((data, index) => (
            <tr
              key={index}
              className={classNames(
                ranked
                  ? index === 0
                    ? "bg-[#EDFCD3]"
                    : index === 1
                    ? "bg-[#DCE1FE]"
                    : index === 2
                    ? "bg-[#FFF7D2]"
                    : ""
                  : "",
                "divide-x divide-[#BDBDBD]",
                action ? "hover:bg-gray-200 cursor-pointer" : ""
              )}
              onClick={(): void => {
                handleRowClick(data);
              }}
              role={action ? "button" : undefined}
            >
              {columns.map((column, row) => (
                <td
                  key={row}
                  className={`p-4 text-center whitespace-nowrap text-sm leading-7 ${
                    row === 7 || row === 8 ? "" : ""
                  }`}
                >
                  {column.fieldId === "index" &&
                    index + 1 + (currentPage - 1) * limit}
                  {column?.render === undefined && data[column.fieldId]}
                  <p className="text-gray-500">
                    {column?.fieldId2 !== undefined && data[column.fieldId2]}
                  </p>
                  {column?.render !== undefined && column.render(data)}
                  <span>
                    {column?.fieldId3 !== undefined && data[column.fieldId3]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        {loading !== true && isEmpty(error) && isEmpty(data) && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              <div className="flex flex-col items-center">
                <span className="py-6 text-base text-[#7C7C7C] ">
                  No Data Here
                </span>
              </div>
            </td>
          </tr>
        )}
        {loading !== true && !isEmpty(error) && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              {error}
            </td>
          </tr>
        )}
        {loading === true && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
