import { TTask } from "@/Types/FirebaseTypes";
type TaskProps = {
  task: TTask;
};

function Task(props: TaskProps) {
  return (
    <div className="bg-white/30 dark:bg-zinc-700/30 rounded-md space-y-2 drop-shadow-md hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-zinc-600 dark:active:bg-zinc-500/70 h-auto m-2">
      <div className="grid grid-cols-4 p-5 h-auto">
        <div className="col-span-3 h-full">
          <div className="font-semibold break-words dark:text-zinc-300 ">
            {props.task.title}
          </div>
          <div className="flex  items-center space-x-2 text-zinc-500 dark:text-zinc-400 text-sm truncate">
            {props.task.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
