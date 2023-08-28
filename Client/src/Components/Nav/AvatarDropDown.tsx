import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";

import { Auth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  CogIcon,
  BriefcaseIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NewspaperIcon } from "@heroicons/react/24/solid";

function AvatarDropDown({ auth }: { auth: Auth }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 rounded-full cursor-pointer mr-8">
          <AvatarImage
            src={auth.currentUser?.photoURL || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>Jared Tucker</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 default-bg mx-4 origin-top-right">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
            <UserIcon className="w-5 h-5 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
            <CogIcon className="w-5 h-5 mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
          <BriefcaseIcon className="w-5 h-5 mr-2" />
          <span>My Boards</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
          <NewspaperIcon className="w-5 h-5 mr-2" />
          <span>My Tasks</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              handleLogout();
            }}
            className="hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropDown;
