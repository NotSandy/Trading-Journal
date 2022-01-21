/* eslint-disable react/jsx-key */
import { NextPage } from "next";
import React from "react";
import Image from "next/image";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
  usePagination,
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
        <SearchCircleIcon className="absolute w-8 h-8 top-2 text-primary-500" />
        <input
          type="text"
          className="w-full h-12 pl-12 tracking-widest transition duration-500 bg-transparent border-0 border-b-2 outline-none placeholder-opacity-80 border-b-neutral-800 placeholder-neutral-100 text-primary-500 focus:border-b-primary-500 selection:text-secondary-500"
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
  const options = React.useMemo(() => {
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
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

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
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="relative overflow-hidden rounded-md bg-neutral-800">
      <div className="flex justify-between bg-primary-500">
        <span className="p-4 mb-8 text-lg font-semibold text-neutral-100">
          Your Trades
        </span>
        <div className="relative w-32 h-32 mr-4">
          <Image src="/assets/undraw/data.svg" alt="Email" layout="fill" />
        </div>
      </div>
      <div className="p-4">
        <div className="pb-4 sm:flex sm:gap-x-2">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div className="mt-2 sm:mt-0" key={column.id}>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
        <div className="overflow-x-scroll">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-neutral-700"
          >
            <thead className="bg-primary-500">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      scope="col"
                      className="px-6 py-3 text-left uppercase text-neutral-100"
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span className="pl-2">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDescendingIcon className="w-4 h-4 text-gray-400" />
                            ) : (
                              <SortAscendingIcon className="w-4 h-4 text-gray-400" />
                            )
                          ) : (
                            <SelectorIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
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
              className="divide-y bg-neutral-800 divide-neutral-700 text-neutral-200"
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex justify-between flex-1 sm:hidden">
            <Button
              className=""
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </Button>
            <Button
              className=""
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-x-2">
              <span className="text-sm text-neutral-100">
                Page <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <label>
                <span className="sr-only">Items Per Page</span>
                <select
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                  className=""
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </PageButton>
                <PageButton
                  className=""
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </PageButton>
                <PageButton
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
  );
};

export default TradesTable;
