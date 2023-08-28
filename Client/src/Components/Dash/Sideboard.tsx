import React from "react";
import { Link } from "react-router-dom";
import useBoards from "@/Hooks/useBoards";
function Sideboard() {
  const boards = useBoards();

  return (
    <div className="w-[15rem] lg:w-[17rem] h-full py-4  border-r border-r-zinc-600/60  dark:border-r-zinc-400/60">
      <div className="flex flex-col">
        <header className="font-bold text-lg px-3 text-zinc-800/80 dark:text-zinc-200/80">
          Boards
        </header>
        <section className="my-3  pb-3  dark:border-b-zinc-400/60">
          <ul className="mx-6 space-y-2 ">
            {/* {[1, 2, 3, 4, 5].map((index) => {
              return (
                <li className="text-sm font-semibold dark:text-zinc-400">
                  Project {index}
                </li>
              );
            })} */}
            {/* todo: Update Loading Component */}
            {boards.loading ? (
              <div>Loading Cuz</div>
            ) : (
              boards.boards.map((board) => {
                return (
                  <li
                    key={board.boardID}
                    className="text-sm font-semibold dark:text-zinc-400"
                  >
                    <Link to={`board/${board.boardID}`}>{board.boardName}</Link>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Sideboard;
