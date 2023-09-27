import React, { HtmlHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/Components/ui/dialog";
import { DropdownMenuItem, DropdownMenuLabel } from "@/Components/ui/dropdown-menu";
type ViewTaskDialogueProps = {
  title: string;
  modal: React.ReactNode;
  className?: string;
};



function ViewTaskDialogue(viewTaskAction: ViewTaskDialogueProps) {
  const { title, modal, className } = viewTaskAction;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuLabel className={cn("cursor-pointer hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 rounded-lg", className)}>
          {title}
        </DropdownMenuLabel>
      </DialogTrigger>
      <DialogContent>{modal}</DialogContent>
    </Dialog>
  );
}

export default ViewTaskDialogue;
