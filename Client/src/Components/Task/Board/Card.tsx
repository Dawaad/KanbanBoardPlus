import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/Components/ui/alert-dialog";

import { TTask } from "@/Types/FirebaseTypes";

import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import ViewTaskDialogue from "../Modals/View/ViewTaskDialogue";
import ViewTaskAlert from "../Modals/View/ViewTaskAlert";
import TaskDelete from "../Modals/View/TaskDelete";
import TaskUsers from "../Modals/View/TaskUsers";
import TaskOverview from "../Modals/View/TaskOverview";

type CardProps = {
  task: TTask;
  index: number;
  boardID: string;
  innerRef: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps: DraggableProvidedDraggableProps;
  deleteTaskCallback: (taskID: string) => void;
};

// TODO: Refactor Card for support with Update Task model

function ColumnCard({
  task,
  boardID,
  innerRef,
  dragHandleProps,
  draggableProps,
  deleteTaskCallback,
}: CardProps) {
  const { title, description } = task;
  const isFuture = task.assignedDate
    ? new Date(task.assignedDate) > new Date()
    : false;

  return (
    <div
      className={`${
        !isFuture
          ? "bg-white/60 dark:bg-zinc-700/60"
          : "bg-white/30 dark:bg-zinc-700/30"
      } rounded-md space-y-2 drop-shadow-md hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-zinc-600 dark:active:bg-zinc-500/70 h-auto m-2`}
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="grid grid-cols-4 p-5 h-auto">
        <div className="col-span-3 h-full">
          <div className="font-semibold break-words dark:text-zinc-300 ">
            {title}
          </div>
          <div className="flex  items-center space-x-2 text-zinc-500 dark:text-zinc-400 text-sm truncate">
            {description}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisHorizontalCircleIcon className="w-8 h-8 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/90 dark:bg-zinc-800">
              <ViewTaskDialogue
                title="Overview"
                modal={<TaskOverview task={task} />}
              />

              <ViewTaskAlert
                title="Add User"
                modal={<TaskUsers task={task} boardID={boardID} />}
              />
              <ViewTaskAlert
                className="text-red-400"
                title="Archive"
                modal={<TaskDelete task={task} onDelete={deleteTaskCallback} />}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default ColumnCard;
