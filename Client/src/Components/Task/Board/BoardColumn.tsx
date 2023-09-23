import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnCard from "./Card";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { TColumn, TTask } from "@/Types/FirebaseTypes";

type BoardProps = {
  column: TColumn | undefined;
  index: number;
  handleColumnDelete: (columnIndex: number) => void;
};

function BoardColumn({ column, index, handleColumnDelete }: BoardProps) {
  if (!column) return null;
  const { id, title, tasks, backLog } = column;
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={column.backLog}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-md shadow-zinc-500 dark:shadow-none ${
                  snapshot.isDraggingOver
                    ? "bg-green-200 dark:bg-green-400/80"
                    : ` ${
                        backLog
                          ? "bg-white/30 dark:bg-zinc-800/50"
                          : "bg-white/50 dark:bg-zinc-800/80"
                      } flex-1 md:w-72 `
                }`}
              >
                <h2
                  className={`flex  font-bold text-xl px-2 pt-1 pb-2 dark:text-zinc-300 border-b border-b-zinc-600/70 ${
                    backLog
                      ? " dark:border-b-zinc-400/70"
                      : "dark:border-b-zinc-600/70"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleColumnDelete(index);
                    }}
                  >
                    <XCircleIcon className="h-8 w-8 text-red-500 hover:text-red-700" />
                  </button>
                  <p className="ml-12">{title}</p>
                </h2>
                <div className="space-y-2">
                  {tasks.map((task, index) => {
                    return (
                      <Draggable
                        key={`${id}-${task.id}`}
                        draggableId={`${id}-${task.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <ColumnCard
                            task={task}
                            index={index}
                            innerRef={provided.innerRef}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button className="text-green-500 hover:text-green-700">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default BoardColumn;
