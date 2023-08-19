import React from "react";
import { Link } from "react-router-dom";
function Sideboard() {
  return (
    <div className="w-[15rem] lg:w-[17rem] h-full py-4  border-r border-r-zinc-600/60  dark:border-r-zinc-400/60">
      <div className="flex flex-col">
        <header className="font-bold text-lg px-3 text-zinc-800/80 dark:text-zinc-200/80">
          Boards
        </header>
        <section className="my-3  pb-3 border-b border-b-zinc-600/60 dark:border-b-zinc-400/60">
          <ul className="mx-6 space-y-2 ">
            {[1, 2, 3, 4, 5].map((index) => {
              return (
                <li className="text-sm font-semibold dark:text-zinc-400">
                  Project {index}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Sideboard;
