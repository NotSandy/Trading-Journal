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
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: {
  column: { filterValue: any; setFilter: any; preFilteredRows: any; id: any };
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
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
      <div className="p-4 overflow-x-scroll">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div key={column.id}>
                <label htmlFor={column.id}>{column.render("Header")}: </label>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
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
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="divide-y bg-neutral-800 divide-neutral-700"
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
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {state.pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
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
        </div>
        <div>
          <pre>
            <code>{JSON.stringify(state, null, 2)}</code>
          </pre>
        </div>
        {/* <table className="w-full table-auto min-w-max">
          <thead>
            <tr className="uppercase text-neutral-100">
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Ticker</th>
              <th className="px-6 py-3 text-left">Expiry</th>
              <th className="px-6 py-3 text-left">Strike</th>
              <th className="px-6 py-3 text-left">Srategy</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Entry</th>
              <th className="px-6 py-3 text-left">Exit</th>
              <th className="px-6 py-3 text-left">Premium</th>
              <th className="px-6 py-3 text-left">Return</th>
              <th className="px-6 py-3 text-left">Return %</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-6 py-3 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2"></div>
                  <span className="font-medium">React Project</span>
                </div>
              </td>
              <td className="px-6 py-3 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="px-6 py-3 text-center">
                <div className="flex items-center justify-center">
                  <img
                    className="w-6 h-6 transform border border-gray-200 rounded-full hover:scale-125"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                  />
                  <img
                    className="w-6 h-6 -m-1 transform border border-gray-200 rounded-full hover:scale-125"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                  />
                  <img
                    className="w-6 h-6 -m-1 transform border border-gray-200 rounded-full hover:scale-125"
                    src="https://randomuser.me/api/portraits/men/3.jpg"
                  />
                </div>
              </td>
              <td className="px-6 py-3 text-center">
                <span className="px-3 py-1 text-xs text-purple-600 bg-purple-200 rounded-full">
                  Active
                </span>
              </td>
              <td className="px-6 py-3 text-center">
                <div className="flex justify-center item-center">
                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default TradesTable;
