import { useState, useEffect } from "react";
import TaskBoardComp from "../../Components/Task/Board/Taskboard";
import TaskSideBar from "../../Components/Task/Board/TaskSideBar";
function TaskBoard() {
  return (
    <main className="overflow-hidden flex flex-row h-[100dvh]">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-400 dark:to-red-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>
    
        <TaskSideBar />
   

      <section className="overflow-x-scroll my-2 scrollbar scrollbar-thumb-zinc-700/50 dark:scrollbar-thumb-zinc-400/70 scrollbar-thumb-rounded-lg flex ">
        <TaskBoardComp />
        <div>Hey</div>                    
      </section>
    </main>
  );
}

export default TaskBoard;
