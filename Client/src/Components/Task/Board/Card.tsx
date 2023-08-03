import { XCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
type CardProps = {
  task: string;
  index: number;
  id: string;
  innerRef: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps: DraggableProvidedDraggableProps;
};
function ColumnCard({
  task,

  innerRef,
  dragHandleProps,
  draggableProps,
}: CardProps) {
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md hover:bg-zinc-200 active:bg-zinc-300 h-auto"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="grid grid-cols-4 p-5 h-auto">
        <div className="col-span-3 h-full">
          <div className="font-semibold break-words ">{task}</div>
          <div className="flex  items-center space-x-2 text-zinc-500 text-sm">
            <CheckCircleIcon className="h-4 w-4" />
            <p>0/5</p>
          </div>
        </div>
        <button
          onClick={() => {}}
          className=" items-center text-red-500 hover:text-red-700 "
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default ColumnCard;
