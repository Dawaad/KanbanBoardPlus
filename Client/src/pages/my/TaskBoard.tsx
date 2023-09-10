import { useState, useEffect } from "react";
import TaskBoardComp from "../../Components/Task/Board/Taskboard";
import TaskSideBar from "../../Components/Task/Board/Sidebar/TaskSideBar";
import { useNavigate, useParams } from "react-router-dom";
import useBoard from "@/Hooks/useBoard";
import LoadingSkeleton from "@/Components/Task/Board/LoadingSkeleton";
function TaskBoard() {
  //Retrieve Board ID from params
  const { boardID } = useParams();
  const navigate = useNavigate();
  if (!boardID) {
    navigate("/dashboard");
  }
  //Commented Out while I work on other features not including the board
  // const board = useBoard(boardID);

  //Access Firebase With Board ID

  //If user is not a member of the board, redirect to dashboard

  return (
    <main className="overflow-hidden flex flex-row h-[100dvh]">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-400 dark:to-red-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>

      <TaskSideBar boardID={boardID as string} />

      <section className="overflow-x-scroll my-2 scrollbar scrollbar-thumb-zinc-700/50 dark:scrollbar-thumb-zinc-400/70 scrollbar-thumb-rounded-lg flex ">
        {/* {board.loading ? <LoadingSkeleton/> : <TaskBoardComp />} */}
      </section>
    </main>
  );
}

export default TaskBoard;
