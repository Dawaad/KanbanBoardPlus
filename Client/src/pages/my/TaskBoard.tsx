import React, { useEffect } from "react";
import TaskBoardComp from "../../Components/Task/Board/Taskboard";

import { useParams } from "react-router-dom";
import BoardHeader from "../../Components/Task/Board/BoardHeader";
function TaskBoard() {
  const { group } = useParams();

  return (
    <div className="overflow-y-hidden">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-400 dark:to-red-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>
      <BoardHeader code={group} />
      <TaskBoardComp />
    </div>
  );
}

export default TaskBoard;
