import { NextPage } from "next";
import React, { MutableRefObject } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  SelectorIcon,
  SearchCircleIcon,
  FilterIcon,
} from "@heroicons/react/outline";
import DeleteTradeModal from "./DeleteTradeModal";
import EditTradeModal from "./EditTradeModal";
import { StatusBadge } from "../ui/Badge";
import AddTradeModal from "./AddTradeModal";
import { Button, DropdownButton, PageButton } from "../ui/Button";
import Image from "next/image";
import { format, utcToZonedTime } from "date-fns-tz";
import { CSVLink } from "react-csv";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex items-baseline gap-x-2">
      <div className="relative w-full">
        <SearchCircleIcon className="absolute w-8 h-8 top-2 left-2 text-primary-500" />
        <input
          type="text"
          className="w-full h-12 pl-12 tracking-widest placeholder-opacity-75 transition duration-500 border-0 rounded-full outline-none bg-neutral-900 border-b-neutral-800 placeholder-neutral-100 text-neutral-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 selection:text-secondary-500 "
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} trades...`}
        />
      </div>
    </label>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}: {
  column: {
    filterValue: any;
    setFilter: any;
    preFilteredRows: any;
    id: any;
    render: any;
  };
}) {
  const options = React.useMemo<any>(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <label className="flex items-baseline gap-x-2">
      <span className="text-neutral-100 basis-1/3">{render("Header")}: </span>
      <select
        className="block w-full capitalize transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option: any, i: any) => (
          <option className="capitalize" key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: { indeterminate?: any }, ref) => {
    const defaultRef = React.useRef<any>();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      (resolvedRef as MutableRefObject<any>).current.indeterminate =
        indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div>
        <input
          className="transition duration-200 border-0 bg-neutral-900 focus:outline-none focus:ring-0 focus:border-0 text-primary-500 focus:ring-offset-0"
          type="checkbox"
          ref={resolvedRef as MutableRefObject<any>}
          {...rest}
        />
      </div>
    );
  }
);

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

interface ITradesTableSetupProps {
  data: any;
  columns: any;
  onTradeTableSetupChangeHandler: any;
}

const TradesTableSetup: NextPage<ITradesTableSetupProps> = ({
  columns,
  data,
  onTradeTableSetupChangeHandler,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      disableMultiSort: true,
      initialState: {
        sortBy: [
          {
            id: "date",
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  return (
    <div className="px-2 mb-4">
      <div className="relative overflow-x-hidden rounded-md scrollbar-hide bg-neutral-800">
        <div className="flex justify-between bg-primary-500">
          <div className="flex flex-col justify-between p-4">
            <span className="text-lg font-semibold text-neutral-100">
              Your Trades
            </span>
            <AddTradeModal
              onAddTradeHandler={onTradeTableSetupChangeHandler}
            ></AddTradeModal>
          </div>
          <div className="relative w-32 h-32 mr-4">
            <Image
              src="/assets/undraw/data.svg"
              alt="Email"
              layout="fill"
              priority
            />
          </div>
        </div>
        <div className="p-4">
          <div className="block pb-4 gap-x-4 sm:flex sm:justify-between sm:items-center">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <div className="block sm:flex sm:space-x-4">
              {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column) =>
                  column.Filter ? (
                    <div
                      className="mt-2 sm:mt-0 sm:flex sm:items-center"
                      key={column.id}
                    >
                      {column.render("Filter")}
                    </div>
                  ) : null
                )
              )}
              <div className="flex justify-end mt-2 sm:mt-0">
                <DropdownButton Icon={FilterIcon}>
                  {allColumns.map((column) => {
                    if (column.id == "actions" || column.id == "ticker") {
                    } else {
                      return (
                        <div key={column.id} className="flex gap-x-2">
                          <IndeterminateCheckbox
                            {...column.getToggleHiddenProps()}
                          />
                          <span className="capitalize text-neutral-100">
                            {column.id}
                          </span>
                        </div>
                      );
                    }
                  })}
                </DropdownButton>
              </div>
              <Button type="button" className="whitespace-nowrap">
                <CSVLink data={data}>Export</CSVLink>
              </Button>
            </div>
          </div>
          <div className="pb-2 overflow-x-auto overflow-y-hidden scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scrollbar-thin rounded-t-md">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-neutral-700"
            >
              <thead className="bg-primary-500">
                {headerGroups.map((headerGroup) => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...restHeaderGroupProps}>
                      {headerGroup.headers.map((column) => {
                        const { key, ...restColumnProps } =
                          column.getHeaderProps(column.getSortByToggleProps());
                        return (
                          <th
                            key={key}
                            {...restColumnProps}
                            scope="col"
                            className="px-2 py-4 group first:pl-4 last:pr-4"
                          >
                            <div className="flex items-center justify-between text-sm uppercase text-neutral-100">
                              {column.render("Header")}
                              <span className="pl-2">
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <SortDescendingIcon className="w-4 h-4" />
                                  ) : (
                                    <SortAscendingIcon className="w-4 h-4" />
                                  )
                                ) : column.disableSortBy ? (
                                  ""
                                ) : (
                                  <SelectorIcon className="w-4 h-4 transition duration-200 opacity-0 group-hover:opacity-100" />
                                )}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-sm divide-y bg-neutral-800 divide-neutral-700 text-neutral-200 sm:text-base"
              >
                {page.length > 0 ? (
                  page.map((row, i) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr
                        key={key}
                        {...restRowProps}
                        className={`${
                          i % 2 === 0 ? "bg-neutral-800" : "bg-neutral-800"
                        }`}
                      >
                        {row.cells.map((cell) => {
                          const { key, ...restRowProps } = cell.getCellProps({
                            style: {
                              maxWidth: cell.column.width,
                            },
                          });
                          return (
                            <td
                              key={key}
                              {...restRowProps}
                              className="p-2 overflow-hidden whitespace-nowrap first:pl-4 last:pr-4 text-ellipsis"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <div className="my-4">No trades found...</div>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex justify-between flex-1 sm:hidden">
              <Button
                type="button"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-baseline gap-x-2">
                <span className="text-neutral-100">
                  Page <span>{state.pageIndex + 1}</span> of{" "}
                  <span>{pageOptions.length}</span>
                </span>
                <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="block w-full transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                    value={state.pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 20].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <PageButton
                    type="button"
                    className="rounded-l-md"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    type="button"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    type="button"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    type="button"
                    className="rounded-r-md"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </PageButton>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ITradesTableProps {
  data: any;
  onTradeTableChangeHandler: any;
}

const TradesTable: NextPage<ITradesTableProps> = ({
  data,
  onTradeTableChangeHandler,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }: { value: Date }) => {
          if (value == null) {
            return null;
          } else {
            const stringValue = format(
              utcToZonedTime(new Date(value), "UTC"),
              "LLL dd, yyyy"
            );
            return <span>{stringValue}</span>;
          }
        },
      },
      {
        Header: "Ticker",
        accessor: "ticker",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ value }: { value: string }) => {
          if (value == null) {
            return null;
          } else {
            return <span className="font-bold text-primary-100">{value}</span>;
          }
        },
      },
      {
        Header: "Expiry",
        accessor: "expiry",
        Cell: ({ value }: { value: Date }) => {
          if (value == null) {
            return null;
          } else {
            const stringValue = format(
              utcToZonedTime(new Date(value), "UTC"),
              "LLL dd, yyyy"
            );
            return <span>{stringValue}</span>;
          }
        },
      },
      {
        Header: "Strike",
        accessor: "strike",
        sortType: compareNumericString,
        Cell: ({ value }: { value: Number }) => {
          if (value == null) {
            return null;
          } else {
            const stringValue = value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            return <span>{stringValue}</span>;
          }
        },
      },
      {
        Header: "Strategy",
        accessor: "strategy",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusBadge,
      },
      {
        Header: "QTY",
        accessor: "quantity",
      },
      {
        Header: "Entry",
        accessor: "entry",
        sortType: compareNumericString,
        Cell: ({ value }: { value: Number }) => {
          if (value == null) {
            return null;
          } else {
            const stringValue = value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            return <span>{stringValue}</span>;
          }
        },
      },
      {
        Header: "Exit",
        accessor: "exit",
        sortType: compareNumericString,
        Cell: ({ value }: { value: Number }) => {
          if (value == null) {
            return null;
          } else {
            const stringValue = value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            return <span>{stringValue}</span>;
          }
        },
      },
      {
        Header: "Premium",
        accessor: "premium",
        sortType: compareNumericString,
        Cell: ({ value }: { value: Number }) => {
          if (value == null) {
            return null;
          } else {
            const stringValue = value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            return <span>{stringValue}</span>;
          }
        },
      },
      {
        Header: "PnL",
        accessor: "pnl",
        sortType: compareNumericString,
        Cell: ({ value }: { value: Number }) => {
          const statusColor = (value: Number) => {
            if (value < 0) {
              return "text-danger-500";
            } else if (value == 0) {
              return "text-neutral-500";
            } else {
              return "text-success-500";
            }
          };
          if (value == null) {
            return null;
          } else {
            const stringValue = value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            return (
              <span className={`${statusColor(value)}`}>{stringValue}</span>
            );
          }
        },
      },
      {
        Header: "%",
        accessor: "percent",
        sortType: compareNumericString,
        Cell: ({ value }: { value: Number }) => {
          const statusColor = (value: Number) => {
            if (value < 0) {
              return "text-danger-500";
            } else if (value == 0) {
              return "text-neutral-500";
            } else {
              return "text-success-500";
            }
          };

          if (value == null) {
            return null;
          } else {
            const stringValue = value.toFixed(0) + " %";
            return (
              <span className={`${statusColor(value)}`}>{stringValue}</span>
            );
          }
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusBadge,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Notes",
        accessor: "notes",
        disableSortBy: true,
        maxWidth: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }: { row: any }) => (
          <div className="space-x-2">
            <EditTradeModal
              id={row.original.id}
              onEditTradeHandler={onTradeTableChangeHandler}
            ></EditTradeModal>
            <DeleteTradeModal
              id={row.original.id}
              onDeleteTradeHandler={onTradeTableChangeHandler}
            ></DeleteTradeModal>
          </div>
        ),
      },
    ],
    [onTradeTableChangeHandler]
  );

  function compareNumericString(rowA: any, rowB: any, id: any, desc: any) {
    let a = Number.parseFloat(rowA.values[id]);
    let b = Number.parseFloat(rowB.values[id]);
    if (Number.isNaN(a)) {
      // Blanks and non-numeric strings to bottom
      a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (Number.isNaN(b)) {
      b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }

  return (
    <TradesTableSetup
      columns={columns}
      data={data}
      onTradeTableSetupChangeHandler={onTradeTableChangeHandler}
    ></TradesTableSetup>
  );
};

export default TradesTable;
