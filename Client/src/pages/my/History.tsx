import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBoard from "@/Hooks/useBoard";
import Sidebar from "@/Components/Previous/Sidebar";
import BoardBuild from "@/Components/Previous/BoardBuild";
function History() {
  const { boardID } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const userBoard = useBoard(boardID);
  const navigate = useNavigate();
  const { board, userAccess, loading, error } = userBoard;

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
    <main className="relative overflow-hidden flex flex-row h-[100dvh]">
      <div className="absolute w-full  h-[50rem] bg-gradient-to-br from-yellow-400 to-red-500 dark:from-green-400 dark:to-blue-600 rounded-md filter blur-3xl opacity-60 -z-10"></div>
      <Sidebar date={selectedDate} callBack={setSelectedDate} />
      <section>
        {selectedDate && board ? (
          <BoardBuild boardProps={board} selectedDate={selectedDate} />
        ) : (
          <div className="absolute left-1/2 top-1/3 w-[25rem] text-xl md:text-3xl font-bold">
            Please select a date{" "}
          </div>
        )}
      </section>
    </main>
  );
}

export default History;
