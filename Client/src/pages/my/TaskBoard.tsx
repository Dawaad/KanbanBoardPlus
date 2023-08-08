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
import TaskSideBar from "../../Components/Task/Board/TaskSideBar";
function TaskBoard() {
  const { group } = useParams();

  return (
    <main className="overflow-hidden flex flex-row h-[94vh]">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-400 dark:to-red-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>
      <TaskSideBar/>
    
      <section className="overflow-x-scroll my-2 scrollbar scrollbar-thumb-zinc-700/50 dark:scrollbar-thumb-zinc-400/70 scrollbar-thumb-rounded-lg ">
        {/* <BoardHeader code={group} /> */}
        <TaskBoardComp />
      </section>
    </main>
  );
}

export default TaskBoard;
