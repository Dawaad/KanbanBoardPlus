import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnCard from "./Card";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { TColumn, TTask, TUser } from "@/Types/FirebaseTypes";
import AddTask from "../Modals/addTask";
import { useState } from "react";
import axios from "axios";
type BoardProps = {
  column: TColumn | undefined;
  index: number;
  handleColumnDelete: (columnIndex: number) => void;
};

function BoardColumn({ column, index, handleColumnDelete }: BoardProps) {
  if (!column) return null;
  const { id, title, backLog } = column;
  const [tasks, setTasks] = useState<TTask[]>(column.tasks);

  const addTask = (title: string, description: string, date: Date) => {
    axios
      .post("http://localhost:3000/api/tasks/create", {
        columnID: id,
        taskTitle: title,
        taskDescription: description,
        taskDate: date,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const newTask: TTask = res.data;
          setTasks((prev) => {
            return [...prev, newTask];
          });
        }
      });
  };

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
                    <XCircleIcon
                      className={`h-8 w-8 text-red-500 hover:text-red-700 ${
                        backLog ? "hidden" : ""
                      }`}
                    />
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
                        isDragDisabled={
                          new Date(task.assignedDate) > new Date()
                        }
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
                    <AddTask callBack={addTask} isBacklogColumn={backLog} />
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
