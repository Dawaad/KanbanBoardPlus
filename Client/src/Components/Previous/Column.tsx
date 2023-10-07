import React from "react";
import { TColumn } from "@/Types/FirebaseTypes";
import Task from "./Task";
type ColumnProp = {
  column: TColumn;
};
function Column(column: ColumnProp) {
  return (
    <div className="bg-white/50 dark:bg-zinc-800/80 flex-1 md:w-72 h-fit py-4 p-2 rounded-2xl shadow-md shadow-zinc-500 dark:shadow-none">
      <h2
        className={`flex  font-bold text-xl px-2 pt-1 pb-2 dark:text-zinc-300 border-b border-b-zinc-600/70  dark:border-b-zinc-600/70`}
      >
        <p className="ml-12">{column.column.title}</p>
      </h2>
      <div className="space-y-2">
        {column.column.tasks.map((task, index) => {
            return <Task key={task.id} task={task}/>
        })}
      </div>
    </div>
  );
}

export default Column;
