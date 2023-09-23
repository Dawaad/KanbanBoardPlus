import { useState, useEffect } from "react";
import TaskBoardComp from "../../Components/Task/Board/Taskboard";
import TaskSideBar from "../../Components/Task/Sidebar/TaskSideBar";
import { useNavigate, useParams } from "react-router-dom";
import useBoard from "@/Hooks/useBoard";
import LoadingSkeleton from "@/Components/Task/Board/LoadingSkeleton";
import { TBoard } from "@/Types/FirebaseTypes";
import AddColumn from "@/Components/Task/Modals/AddColumn";
function TaskBoard() {
  //Retrieve Board ID from params
  const { boardID } = useParams();
  const navigate = useNavigate();
  if (!boardID) {
    navigate("/dashboard");
  }

  const userBoard = useBoard(boardID);
  console.log(userBoard);
  const { board, userAccess, loading, error } = userBoard;

  // If server cannot located board, redirect to dashboard
  useEffect(() => {
    if (!loading) {
      if (!board || !userAccess) {
        navigate("/my");
      }
    }
  }, [board, loading]);

  if (!board) {
    return <></>;
  }

  return (
    <main className="overflow-hidden flex flex-row h-[100dvh]">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-400 dark:to-red-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>

      <TaskSideBar board={board} />

      <section className="w-full overflow-x-scroll my-2 scrollbar scrollbar-thumb-zinc-700/50 dark:scrollbar-thumb-zinc-400/70 scrollbar-thumb-rounded-lg flex ">
        {loading ? <LoadingSkeleton /> : <TaskBoardComp board={board} />}
      </section>
    </main>
  );
}

export default TaskBoard;
