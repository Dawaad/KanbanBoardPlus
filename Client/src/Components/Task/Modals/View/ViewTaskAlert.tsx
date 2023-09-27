import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/Components/ui/alert-dialog";
import { DropdownMenuItem, DropdownMenuLabel } from "@/Components/ui/dropdown-menu";
type viewTaskAlertProps = {
  title: string;
  modal: React.ReactNode;
  className?: string;
};

function ViewTaskAlert(viewTaskAction: viewTaskAlertProps) {
  const { title, modal, className } = viewTaskAction;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuLabel className={cn("cursor-pointer hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 rounded-lg", className)}>
          {title}
        </DropdownMenuLabel>
      </AlertDialogTrigger>
      <AlertDialogContent>{modal}</AlertDialogContent>
    </AlertDialog>
  );
}

export default ViewTaskAlert;
