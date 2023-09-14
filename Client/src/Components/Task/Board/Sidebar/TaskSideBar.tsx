import React from "react";

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
import SidebarSegment from "@/Components/Task/Board/Sidebar/SidebarSection";
import InviteModal from "./Modals/InviteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

// Array of different colours in hex notation
const colourHex = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
];
const users = ["LM", "JL", "LK", "P4", "P5", "P6"];

type boardProps = {
  boardID: string;
}

function TaskSideBar(boardID: boardProps) {
  return (
    <aside className="w-[3rem] hover:w-[25rem] bg-zinc-200/40 dark:bg-zinc-900/50  transition-all  ">
      <section
        className="py-4 border-b border-b-zinc-600/60 dark:border-b-zinc-400/60"
        id="section-social"
      >
        <div className="flex items-center overflow-hidden pb-2">
          <div className="ml-2 mr-3 ">
            {/*Sample Avatar, Replace Dynamically with User's*/}

            <Avatar className="w-9 h-9 ">
              <AvatarImage />
              <AvatarFallback className="bg-red-500">JT</AvatarFallback>
            </Avatar>
          </div>
          {/*This should be the avatar of the other team members within the kanban board*/}
          <div className="flex -space-x-1">
            {users.slice(0, 4).map((user: string, index: number) => {
              return (
                <Avatar className="w-9 h-9" key={user}>
                  <AvatarImage />
                  <AvatarFallback className={`${colourHex[index]}`}>
                    {user}
                  </AvatarFallback>
                </Avatar>
              );
            })}
          </div>
          <div className="text-zinc-700 dark:text-zinc-300 text-smml-mr-33">
            {" "}
            +{`${users.slice(3).length}`}{" "}
          </div>
        </div>
        <SidebarSegment
          iconDetails={{
            icon: (
              <ShareIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
            ),
            title: "Invite Others",
            onClick: () => {
              console.log("Invite Others Clicked");
            },
            modal: <InviteModal boardID={boardID.boardID} />,
          }}
        />
      </section>

      <section
        id="section-history"
        className="border-b border-b-zinc-600/60 dark:border-b-zinc-400/60 space-y-2 py-4"
      >
        <SidebarSegment
          iconDetails={{
            icon: (
              <ClockIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
            ),
            title: "View History",
            onClick: () => {
              console.log("View History Clicked");
            },
          }}
        />
        <SidebarSegment
          iconDetails={{
            icon: (
              <PresentationChartLineIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
            ),
            title: "Activity",
            onClick: () => {
              console.log("Activity Clicked");
            },
          }}
        />
        <SidebarSegment
          iconDetails={{
            icon: (
              <ArchiveBoxArrowDownIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
            ),
            title: "Archived Tasks",
            onClick: () => {
              console.log("Archived Tasks Clicked");
            },
          }}
        />
      </section>

      <section id="section-board" className="py-4 space-y-2">
        <SidebarSegment
          iconDetails={{
            icon: (
              <CogIcon className="w-7 h-7 text-zinc-800/90 dark:text-zinc-300" />
            ),
            title: "Settings",
            onClick: () => {
              console.log("Settings Clicked");
            },
          }}
        />
      </section>
    </aside>
  );
}

export default TaskSideBar;
