import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import useMemberContribution from "@/Hooks/useMemberContribution";

export type tableMemberContribution = {
  member: string;
  allocation: string;
  percentage: string;
};

export const columns: ColumnDef<tableMemberContribution>[] = [
  {
    header: "Member",
    accessorKey: "member",
  },
  {
    header: "Allocation",
    accessorKey: "allocation",
  },
  {
    header: "Percentage",
    accessorKey: "percentage",
  },
];

type BoardMembersProps = {
  boardID: string;
};
function BoardMembers(boardID: BoardMembersProps) {
  const { memberContribution, loading, error } = useMemberContribution(
    boardID.boardID
  );
  if (!memberContribution) return null;

  const parsedMemberContribution = memberContribution?.userContribution.map(
    (member) => {
      return {
        member: member.user.displayName,
        allocation: `${member.tasksAllocated} / ${memberContribution.totalTasks} Tasks`,
        percentage: `${Math.floor(
          (member.tasksAllocated / memberContribution.totalTasks) * 100
        )}%`,
      };
    }
  );

  return (
    <DialogContent>
      <DialogTitle>Board Members</DialogTitle>
      <DataTable columns={columns} data={parsedMemberContribution} />
    </DialogContent>
  );
}

export default BoardMembers;
