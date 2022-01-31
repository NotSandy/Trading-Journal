/* eslint-disable react/jsx-key */
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
} from "@heroicons/react/outline";
import DeleteTradeModal from "../trades/DeleteTradeModal";
import EditTradeModal from "../trades/EditTradeModal";
import { StatusBadge } from "../ui/Badge";
import AddTradeModal from "../trades/AddTradeModal";
import { Button, PageButton } from "../ui/Button";

interface IOpenTradesTableProps {
  data: any;
  columns: any;
}

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

const OpenTradesTable: NextPage<IOpenTradesTableProps> = ({
  data,
  columns,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: data,
      disableMultiSort: true,
      initialState: {
        sortBy: [
          {
            id: "date",
            desc: true,
          },
        ],
        pageSize: 5,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // {
        //   id: "selection",
        //   Header: ({ getToggleAllPageRowsSelectedProps }) => (
        //     <div>
        //       <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
        //     </div>
        //   ),
        //   Cell: ({ row }) => (
        //     <div>
        //       <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        //     </div>
        //   ),
        // },
        ...columns,
      ]);
    }
  );
  return (
    <div className="px-2 mb-4">
      <div className="relative overflow-hidden rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="text-lg font-bold text-neutral-100">
              <span>Open Trades</span>
            </div>
          </div>
          <div className="overflow-hidden basis-full">
            <div className="flex items-center justify-between pb-4 space-x-2">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <AddTradeModal></AddTradeModal>
            </div>
            <div className="overflow-x-auto overflow-y-hidden basis-full scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scrollbar-thin rounded-t-md">
              <table
                {...getTableProps()}
                className="w-full divide-y divide-neutral-700"
              >
                <thead className="bg-primary-500">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className="px-2 py-4 text-sm text-left uppercase group sm:text-base text-neutral-100 first:pl-4 last:pr-4"
                        >
                          <div className="flex items-center justify-between">
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
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="text-sm divide-y bg-neutral-800 divide-neutral-700 text-neutral-200 sm:text-base"
                >
                  {page.length > 0 ? (
                    page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps({
                                  style: {
                                    maxWidth: cell.column.width,
                                  },
                                })}
                                className="px-2 py-4 overflow-hidden whitespace-nowrap first:pl-4 last:pr-4 text-ellipsis"
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
                      <ChevronRightIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
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
    </div>
  );
};

interface IOpenTradesProps {
  data: any;
}

const OpenTrades: NextPage<IOpenTradesProps> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Ticker",
        accessor: "ticker",
        filter: "includes",
      },
      {
        Header: "Expiry",
        accessor: "expiry",
      },
      {
        Header: "Strike",
        accessor: "strike",
      },
      {
        Header: "Strategy",
        accessor: "strategy",
        filter: "includes",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusBadge,
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
            <EditTradeModal id={row.original.id}></EditTradeModal>
            <DeleteTradeModal id={row.original.id}></DeleteTradeModal>
          </div>
        ),
      },
    ],
    []
  );
  return <OpenTradesTable columns={columns} data={data}></OpenTradesTable>;
};

export default OpenTrades;
