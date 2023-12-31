import React, { useEffect } from "react";
import { TTask } from "@/Types/FirebaseTypes";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
type TaskDeleteProps = {
  task: TTask;
  onDelete: (taskID: string, columnID: string) => void;
  columnID: string;
};

function TaskDelete({ task, onDelete, columnID }: TaskDeleteProps) {

  const handleDelete = () => {
    onDelete(task.id, columnID);
  };

  return (
    <>
      <AlertDialogTitle>Delete Task</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure want to delete this task
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

export default TaskDelete;
