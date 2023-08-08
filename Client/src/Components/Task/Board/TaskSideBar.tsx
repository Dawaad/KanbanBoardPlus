import React from "react";
import Avatar from "react-avatar";
import {
  PlusIcon,
  ShareIcon,
  ClockIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

// Array of different colours in hex notation
const colourHex = ["#328a00", "#0b008a", "#8a1900", "#8a008a", "#8a8a00"];
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
    <section className="w-[2.5rem] hover:w-[15rem] bg-zinc-200/40 dark:bg-zinc-800/50  transition-all space-y-3 ">
      <div className="flex items-center overflow-hidden my-3">
        <div className="ml-1 mr-2 my-2">
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
          {users.slice(0, 3).map((user:string,index:number) => {
            return (
              <Avatar
                className="cursor-pointer"
                round
                size="32"
                color={colourHex[index]}
                name={user}
              />
            );
          })}
        </div>
        <div className="text-zinc-700 dark:text-zinc-300 text-sm ml-1  mt-3">
          {" "}
          +{`${users.slice(3).length}`}{" "}
        </div>
      </div>

      <div className="flex items-center overflow-hidden">
        <div className="ml-1 mr-2 my-2">
          <PlusIcon className="w-7 h-7 text-zinc-800 dark:text-zinc-300" />
        </div>

        <div className="text-base  font-semibold text-zinc-800 dark:text-zinc-300 truncate">
          New Task
        </div>
      </div>

      <div className="flex items-center overflow-hidden">
        <div className="ml-1 mr-2 my-2">
          <ShareIcon className="w-7 h-6 text-zinc-800 dark:text-zinc-300" />
        </div>

        <div className="text-base   font-semibold text-zinc-800 dark:text-zinc-300 truncate">
          Invite Others
        </div>
      </div>

      <div className="flex items-center overflow-hidden">
        <div className="ml-1 mr-2 my-2">
          <ClockIcon className="w-7 h-6 text-zinc-800 dark:text-zinc-300" />
        </div>

        <div className="text-base  font-semibold text-zinc-800 dark:text-zinc-300 truncate">
          View History
        </div>
      </div>

      <div className="flex items-center overflow-hidden">
        <div className="ml-1 mr-2 my-2">
          <CogIcon className="w-7 h-7 text-zinc-800 dark:text-zinc-300" />
        </div>

        <div className="text-base font-semibold text-zinc-800 dark:text-zinc-300">
          Settings
        </div>
      </div>
    </section>
  );
}

export default TaskSideBar;
