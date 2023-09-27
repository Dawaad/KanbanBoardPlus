import React, { useEffect, useState } from "react";

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
import SidebarSegment from "@/Components/Task/Sidebar/SidebarSection";
import InviteModal from "../Modals/Sidebar/InviteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { TBoard, TUser } from "@/Types/FirebaseTypes";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import BoardMembers from "../Modals/Sidebar/BoardMembers";
import History from "../Modals/Sidebar/History";

// Array of different colours in hex notation
const colourHex = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
];

type boardProps = {
  board: TBoard;
};

function TaskSideBar(board: boardProps) {
  const { adminUsers, memberUsers } = board.board;
  const users = [...adminUsers, ...memberUsers];
  const [user, setUser] = useState<User | undefined>(undefined);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <aside className="hidden md:block w-[3rem] hover:w-[25rem] bg-zinc-200/40 dark:bg-zinc-900/50  transition-all  ">
      <section
        className="py-4 border-b border-b-zinc-600/60 dark:border-b-zinc-400/60"
        id="section-social"
      >
        <div className="flex items-center overflow-hidden pb-2">
          <div className="ml-2 mr-3 ">
            {/*Sample Avatar, Replace Dynamically with User's*/}

            <Avatar className="w-9 h-9 ">
              <AvatarImage src={user?.photoURL ?? ""} />
              <AvatarFallback className="bg-red-500">
                {user?.displayName?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          {/*This should be the avatar of the other team members within the kanban board*/}
          <div className="flex -space-x-1">
            {users
              .filter((member) => {
                return member.uid != user?.uid;
              })
              .slice(0, 4)
              .map((user: TUser, index: number) => {
                return (
                  <Avatar className="w-9 h-9" key={user.uid}>
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback className={`${colourHex[index]}`}>
                      {user.displayName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                );
              })}
          </div>
          {users.slice(3).length > 0 ? (
            <div className="text-zinc-700 dark:text-zinc-300 text-smml-mr-33">
              {" "}
              +{`${users.slice(3).length}`}{" "}
            </div>
          ) : (
            <></>
          )}
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
            modal: <InviteModal board={board.board} />,
          }}
        />
        <SidebarSegment
          iconDetails={{
            icon: (
              <UserGroupIcon className="w-7 h-6 text-zinc-800/90 dark:text-zinc-300" />
            ),
            title: "Members",
            onClick: () => {},
            modal: <BoardMembers/>,
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
          modal: <History boardID={board.board.id}/>
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
