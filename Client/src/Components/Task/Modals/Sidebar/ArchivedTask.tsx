import useArchived from "@/Hooks/useArchived";
import { TTask } from "@/Types/FirebaseTypes";
import { DialogContent, DialogTitle } from "@/Components/ui/dialog";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";

type ArchivedTaskProps = {
  boardID: string;
};

type tableArchivedTask = {
  title: string;
  description: string;
  archivedDate: string;
};

export const columns: ColumnDef<tableArchivedTask>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Archived Date",
    accessorKey: "archivedDate",
  },
];

function ArchivedTask(boardID: ArchivedTaskProps) {
  const { archived, loading, error } = useArchived(boardID.boardID);
  const parsedArchived = archived.map((task: TTask) => {
    console.log(task.archivedDate)
    return {
      title: task.title,
      description: task.description,
      archivedDate: task.archivedDate ? new Date(task.archivedDate).toLocaleString("en-us") : "",
    };
  });

  return (
    <DialogContent className="py-10">
      <DialogTitle className="text-xl font-bold">Archived Tasks</DialogTitle>
      <DataTable columns={columns} data={parsedArchived} />
    </DialogContent>
  );
}

export default ArchivedTask;
