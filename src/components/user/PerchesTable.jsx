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
import {
  UpdatePlaneStatus,
  createOrder,
  getSubscriptionData,
} from "../../api/subscription.js";

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
    { header: "Plan status", accessorKey: "plan_status" },
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
        if (!isDisabled) {
          UpdatePlaneStatus({
            authToken,
            order_id: row.original.order_id,
            plan_status: "expire",
          });
        }

        return (
          <button
            disabled={isDisabled || row.original.status === "expire"}
            onClick={() => handleEdit()}
            className={`${
              row.original.status === "expire"
                ? "text-rose-700"
                : `dark:text-white text-black ${
                    isDisabled ? "bg-transparent " : "bg-blue-700"
                  } px-4 py-2 rounded-md`
            }`}
          >
            {isDisabled ? "valid" : "pay"}
            {row.original.status === "expire" ? "expire" : null}
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
        <div className="flex items-center justify-center py-10">
          <button
            className="dark:text-black bg-blue-700 text-white dark:bg-white px-5 rounded-md cursor-pointer py-3"
            onClick={() => handleEdit()}
          >
            Subscribe
          </button>
        </div>
      ) : (
        <React.Fragment>
          <div className="flex flex-col md:mx-10 w-[100vw]  h-fit">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              scope="col"
                              className="px-6 py-4"
                            >
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
                        <tr
                          key={row.id}
                          className="border-b border-neutral-200 dark:border-white/10"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="whitespace-nowrap px-6 py-4 font-medium"
                            >
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
                </div>
              </div>
            </div>
            <div className="flex justify-between my-10 mx-6">
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                className="dark:bg-white bg-black px-4 py-2 rounded-md dark:text-black text-white cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                className="dark:bg-white bg-black px-4 py-2 rounded-md dark:text-black text-white cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

PerchesTable.propTypes = {
  UserData: PropTypes.object,
};

export default PerchesTable;
