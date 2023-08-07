import React, { useEffect } from "react";
import TaskBoardComp from "../../Components/Task/Board/Taskboard";
import {
  ShareIcon,
  ClockIcon,
  CogIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import BoardHeader from "../../Components/Task/Board/BoardHeader";
function TaskBoard() {
  const { group } = useParams();

  return (
    <main className="overflow-hidden flex flex-row">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-400 dark:to-red-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>
      <section className="w-[2.5rem] hover:w-[15rem] bg-zinc-200/40 dark:bg-zinc-800/80 border-r border-r-slate-400 dark:border-none  transition-all space-y-3 ">
        <div className="flex items-center overflow-hidden">
          <div className="mx-2 my-2">
            <PlusIcon className="w-7 h-7 text-zinc-300" />
          </div>

          <div className="text-base  font-semibold text-zinc-300 truncate">
            New Task
          </div>
        </div>
        <div className="flex items-center overflow-hidden">
          <div className="mx-2 my-2">
            <ShareIcon className="w-6 h-6 text-zinc-300" />
          </div>

          <div className="text-base  ml-1 font-semibold text-zinc-300 truncate">
            Invite Others
          </div>
        </div>
        <div className="flex items-center overflow-hidden">
          <div className="mx-2 my-2">
            <ClockIcon className="w-7 h-7 text-zinc-300" />
          </div>

          <div className="text-base  font-semibold text-zinc-300 truncate">
            View History
          </div>
        </div>
        <div className="flex items-center overflow-hidden">
          <div className="mx-2 my-2">
            <CogIcon className="w-7 h-7 text-zinc-300" />
          </div>

          <div className="text-base font-semibold text-zinc-300">Settings</div>
        </div>
      </section>
      <section className="overflow-x-scroll">
        {/* <BoardHeader code={group} /> */}
        <TaskBoardComp />
      </section>
    </main>
  );
}

export default TaskBoard;
