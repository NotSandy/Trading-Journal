/* eslint-disable react/jsx-key */
import { NextPage } from "next";
import React, { MutableRefObject } from "react";
import Image from "next/image";
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
import { Button, PageButton } from "../ui/Button";
import AddTradeModal from "./AddTradeModal";

interface Props {
  columns: any;
  data: any;
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

const TradesTable: NextPage<Props> = ({ columns, data }) => {
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
        <div className="flex justify-between bg-primary-500">
          <div className="flex flex-col justify-between p-4">
            <span className="text-lg font-semibold text-neutral-100">
              Your Trades
            </span>
            <AddTradeModal></AddTradeModal>
          </div>
          <div className="relative w-32 h-32 mr-4">
            <Image src="/assets/undraw/data.svg" alt="Email" layout="fill" />
          </div>
        </div>
        <div className="p-4">
          <div className="block pb-4 space-x-2 sm:flex sm:justify-between">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <div className="block sm:flex sm:space-x-2">
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
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scrollbar-thin rounded-t-md">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-neutral-700"
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

export default TradesTable;
