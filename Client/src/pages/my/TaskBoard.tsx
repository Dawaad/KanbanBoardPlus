import React, { useEffect } from "react";
import TaskBoardComp from "../../Components/Task/Board/Taskboard";

import { useParams } from "react-router-dom";
import BoardHeader from "../../Components/Task/Board/BoardHeader";
function TaskBoard() {
  const { group } = useParams();

  return (
    <div className="">
      <BoardHeader code={group}/>    
      <TaskBoardComp />
    </div>
  );
}

export default TaskBoard;
