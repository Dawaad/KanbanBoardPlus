import { DialogContent } from "@/Components/ui/dialog";
import React from "react";
import { history } from "@/Types/FirebaseTypes";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/Components/ui/skeleton";
import useHistory from "@/Hooks/useHistory";
import { DataTable } from "@/Components/ui/data-table";
export type tableHistory = {
  date: string;
  action: string;
  user: string;
};

export const columns: ColumnDef<tableHistory>[] = [
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
  {
    header: "User",
    accessorKey: "user",
  },
];

type HistoryProps = {
  boardID: string;
};

function History(boardID: HistoryProps) {
  const historyData = useHistory(boardID.boardID);
  const { loading, error, history } = historyData;

  const parsedHistory = history.map((history) => {
    return {
      date: new Date(history.date).toLocaleString("en-us"),
      action: history.action,
      user: history.user.displayName,
    };
  });

  return (
    <DialogContent  className="py-10">
      <DataTable columns={columns} data={parsedHistory} />
    </DialogContent>
  );
}

export default History;
