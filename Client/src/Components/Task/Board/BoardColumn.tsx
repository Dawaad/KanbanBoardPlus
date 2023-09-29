import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnCard from "./Card";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { TColumn, TTask, TUser } from "@/Types/FirebaseTypes";
import AddTask from "../Modals/AddTask";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { set } from "date-fns";
type BoardProps = {
  column: TColumn | undefined;
  boardID: string;
  index: number;
  addTask: (title: string, description: string, date: Date, columnID: string) => void;
  removeTask: (taskID: string, columnID: string) => void;
  handleColumnDelete: (columnIndex: number) => void;
};

function BoardColumn({
  column,
  index,
  handleColumnDelete,
  addTask,
  removeTask,
  boardID,
}: BoardProps) {
  if (!column) return null;
  const { id, title, backLog, tasks } = column;

  

  const [user, setUser] = useState<User | undefined>();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(undefined);
    }
  });

  

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
                  {/* <button
                    onClick={() => {
                      handleColumnDelete(index);
                    }}
                  >
                    <XCircleIcon
                      className={`h-8 w-8 text-red-500 hover:text-red-700 ${
                        backLog ? "hidden" : ""
                      }`}
                    />
                  </button> */}
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
                            columnID={id}
                            deleteTaskCallback={removeTask}
                            boardID={boardID}
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
                    <AddTask callBack={addTask} isBacklogColumn={backLog} columnID={id} />
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
