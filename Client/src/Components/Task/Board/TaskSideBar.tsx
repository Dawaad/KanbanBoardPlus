import React from "react";
import Avatar from "react-avatar";
import {
  PlusIcon,
  ShareIcon,
  ClockIcon,
  CogIcon,
  PresentationChartBarIcon,
  PresentationChartLineIcon,
  ArchiveBoxArrowDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";

// Array of different colours in hex notation
const colourHex = ["#308a00", "#0b008a", "#8a1900", "#8a008a", "#8a8a00"];
const users = [
  "Lachlan Mayer",
  "James Lew",
  "Liam O'Kane",
  "Person 4",
  "Person 5",
  "Person 6",
];
function TaskSideBar() {
  return (
    <aside className="w-[3rem] hover:w-[25rem] bg-zinc-200/40 dark:bg-zinc-800/50  transition-all  ">
      <section
        className="py-4 border-b border-b-zinc-600/60 dark:border-b-zinc-400/60"
        id="section-social"
      >
        <div className="flex items-center overflow-hidden pb-2">
          <div className="ml-2 mr-3 ">
            {/*Sample Avatar, Replace Dynamically with Users*/}

            {/*This should be the avatar of the current user */}
            <Avatar
              className="cursor-pointer"
              name="Jared Tucker"
              round
              size="32"
              color="#0055D1"
            />
          </div>
          {/*This should be the avatar of the other team members within the kanban board*/}
          <div className="flex -space-x-1">
            {users.slice(0, 4).map((user: string, index: number) => {
              return (
                <Avatar
                  key={user}
                  className="cursor-pointer"
                  round
                  size="32"
                  color={colourHex[index]}
                  name={user}
                />
              );
            })}
          </div>
          <div className="text-zinc-700 dark:text-zinc-300 text-smml-mr-33">
            {" "}
            +{`${users.slice(3).length}`}{" "}
          </div>
        </div>

        <div className="flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer">
          <div className="ml-2 mr-3 my-2">
            <ShareIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
          </div>

          <div className="text-base   font-semibold text-zinc-800/90 dark:text-zinc-300 truncate">
            Invite Others
          </div>
        </div>
      </section>

      <section
        id="section-history"
        className="border-b border-b-zinc-600/60 dark:border-b-zinc-400/60 space-y-2 py-4"
      >
        <div className="flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer">
          <div className="ml-2 mr-3 my-2">
            <ClockIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
          </div>

          <div className="text-base  font-semibold text-zinc-800/90 dark:text-zinc-300 truncate">
            View History
          </div>
        </div>
        <div className="flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer">
          <div className="ml-2 mr-3 my-2">
            <PresentationChartLineIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
          </div>

          <div className="text-base  font-semibold text-zinc-800/90 dark:text-zinc-300 truncate">
            Activity
          </div>
        </div>
        <div className="flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer">
          <div className="ml-2 mr-3 my-2">
            <ArchiveBoxArrowDownIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
          </div>

          <div className="text-base  font-semibold text-zinc-800/90 dark:text-zinc-300 truncate">
            Archived Tasks
          </div>
        </div>
      </section>

      <section id="section-board" className="py-4 space-y-2">
        <div className="flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer">
          <div className="ml-2 mr-3 my-2">
            <CogIcon className="w-7 h-7 text-zinc-800/90 dark:text-zinc-300" />
          </div>

          <div className="text-base font-semibold text-zinc-800/90 dark:text-zinc-300">
            Settings
          </div>
        </div>
        <div className="flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer">
          <div className="ml-2 mr-3 my-2">
            <AdjustmentsHorizontalIcon className="w-7 h-7 text-zinc-800/90 dark:text-zinc-300" />
          </div>

          <div className="text-base  font-semibold text-zinc-800/90 dark:text-zinc-300 truncate">
            Change Background
          </div>
        </div>
      </section>
    </aside>
  );
}

export default TaskSideBar;
