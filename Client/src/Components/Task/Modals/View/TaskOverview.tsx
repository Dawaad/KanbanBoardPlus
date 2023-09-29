import React from "react";
import { DialogDescription, DialogHeader } from "@/Components/ui/dialog";
import { TTask } from "@/Types/FirebaseTypes";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";

function TaskOverview({ task }: { task: TTask }) {
  const { title, description, assignedUsers } = task;
  return (
    <>
      <DialogHeader className="text-xl font-bold">{title}</DialogHeader>
      <DialogDescription className="  pb-6">
        {description}
      </DialogDescription>

      <DialogHeader className="text-xl font-bold">Assigned Users</DialogHeader>
        <DialogDescription className="  pb-6 border-b border-b-zinc-500 flex gap-2">
           {assignedUsers.length > 0 ? assignedUsers.slice(0,4).map((user) => {
            return(
                <Avatar className="w-9 h-9">
                    <AvatarImage src={user.photoURL}/>
                    <AvatarFallback className="bg-red-500">{user.displayName.substring(0,2)}</AvatarFallback>
                </Avatar>
            )
           }) : "No users assigned"}
        </DialogDescription>
    </>
  );
}

export default TaskOverview;
