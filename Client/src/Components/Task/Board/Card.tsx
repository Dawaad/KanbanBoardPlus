import { TTask } from "@/Types/FirebaseTypes";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ViewTask from "../Modals/ViewTask";
import { Dialog, DialogTrigger, DialogContent } from "@/Components/ui/dialog";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type CardProps = {
  task: TTask;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps: DraggableProvidedDraggableProps;
};

// TODO: Refactor Card for support with Update Task model

function ColumnCard({
  task,
  innerRef,
  dragHandleProps,
  draggableProps,
}: CardProps) {
  const { title, description } = task;
  const isFuture = task.assignedDate
    ? new Date(task.assignedDate) > new Date()
    : false;

  return (
    <Dialog>
      <DialogTrigger asChild>
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
            <button
              //todo add popup for cards when clicked
              onClick={() => {}}
              className=" items-center text-red-500 hover:text-red-700 "
            >
              <XCircleIcon className="ml-5 h-8 w-8" />
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <ViewTask task={task} />
      </DialogContent>
    </Dialog>
  );
}

export default ColumnCard;
