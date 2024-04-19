import React, { useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { extendMoment } from "moment-range";

import { selectAuthToken } from "../../app/slice/authSlice.js";
import { paymentProcess } from "../../utils/utils.js";
import { createOrder, getSubscriptionData } from "../../api/subscription.js";

const momentRange = extendMoment(moment);

const PerchesTable = ({ UserData }) => {
  const authToken = useSelector(selectAuthToken);
  const {
    isSuccess,
    data: SubData,
    error,
    isError,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubscriptionData(authToken),
    refetchInterval: 1000,
  });

  if (isError) {
    toast.error(error);
  }

  const handleEdit = useCallback(async () => {
    const res = await createOrder(authToken);
    paymentProcess(res, UserData);
  }, [UserData, authToken]);

  const columns = [
    {
      header: "ID",
      accessorKey: "order_id",
    },
    {
      header: "Name",
      accessorKey: "user.fullName",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    { header: "Status", accessorKey: "status" },
    {
      header: "Subscription start",
      accessorKey: "start_at",
      cell: (info) => moment(info.getValue()).format("MMM Do YY"),
    },
    {
      header: "End",
      accessorKey: "end_at",
      cell: (info) => moment(info.getValue()).format("MMM Do YY"),
    },
    {
      head: "Next payment Date",
      accessorKey: "next_at",
      cell: (info) => moment(info.getValue()).format("MMM Do YY"),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => {
        const start = moment(row.original.start_at, "YYYY-MM-DD");
        const end = moment(row.original.end_at, "YYYY-MM-DD");
        const range = momentRange.range(start, end);
        const isDisabled = range.contains(moment());

        return (
          <button
            disabled={isDisabled || row.original.status === "expire"}
            onClick={() => handleEdit()}
            className={`${
              row.original.status === "expire"
                ? "text-rose-700"
                : "text-white bg-blue-700 px-4 py-2 rounded-md"
            }`}
          >
            {row.original.status === "expire" ? "expire" : "pay"}
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: isSuccess ? SubData : [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <React.Fragment>
      {SubData && SubData.length === 0 ? (
        <div className="flex items-center justify-center">
          <button
            className="text-black bg-white px-5 py-2 rounded-md cursor-pointer"
            onClick={() => handleEdit()}
          >
            Subscribe
          </button>
        </div>
      ) : (
        <div className="w3-container">
          <table className="w3-table w3-striped w3-bordered">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-10">
            <button
              onClick={() => table.setPageIndex(0)}
              className="bg-white px-4 py-2 rounded-md text-black"
            >
              First page
            </button>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className="bg-white px-4 py-2 rounded-md text-black cursor-pointer"
            >
              Previous
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className="bg-white px-4 py-2 rounded-md text-black cursor-pointer"
            >
              Next
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              className="bg-white px-4 py-2 rounded-md text-black"
            >
              Last page
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

PerchesTable.propTypes = {
  UserData: PropTypes.object,
};

export default PerchesTable;
