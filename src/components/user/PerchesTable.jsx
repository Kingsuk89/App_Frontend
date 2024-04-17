import { useMemo } from "react";
import subscription from "../../../data.json";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const PerchesTable = () => {
  const data = useMemo(() => subscription, []);

  const handleEdit = (rowData) => {
    console.log(rowData);
  };

  const verifyDate = (startDate, endDate, todayDate) => {
    // Convert string dates to Date objects
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    todayDate = new Date(todayDate);

    // Compare dates
    return todayDate >= startDate && todayDate <= endDate;
  };


  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    { header: "Status", accessorKey: "status" },
    {
      header: "Subscription start",
      accessorKey: "start",
      cell: (info) => new Date(info.getValue()).toDateString().split(","),
    },
    {
      header: "End",
      accessorKey: "end",
      cell: (info) => new Date(info.getValue()).toDateString().split(","),
    },
    {
      head: "Next payment Date",
      accessorKey: "next",
      cell: (info) => new Date(info.getValue()).toDateString().split(","),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => {
        const startDate =row.original.start
        const endDate = row.original.end;
        const todayDate = new Date();
        const isDisabled = verifyDate(startDate, endDate, todayDate);
        // if(isDisabled){
        //
        // }
        return (
            <button disabled={isDisabled||row.original.status==="expire"} onClick={() => console.log('hello')} className="text-white bg-blue-700 px-4 py-2 rounded-md">
              Pay
            </button>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default PerchesTable;
