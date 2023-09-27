import React, { useEffect } from "react";
import { TTask } from "@/Types/FirebaseTypes";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/Components/ui/alert-dialog";
import { Skeleton } from "@/Components/ui/skeleton";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import useTaskUser from "@/Hooks/useTaskUser";
import { Button } from "@/Components/ui/button";
type AddUserProps = {
  task: TTask;
  boardID: string;
};

function TaskUsers({ task, boardID }: AddUserProps) {
  const addUserToTask = (uid: string) => {
    axios.post("http://localhost:3000/api/tasks/addUser", {
      userID: uid,
      taskID: task.id,
    });
  };

  //Retrieve all users from the board
  const { users, loading, error } = useTaskUser(boardID);
  
  const eligibleUsers = users.filter((user) => {
    return !task.assignedUsers
      .map((user) => {
        return user.uid;
      })
      .includes(user.uid);
  });

  const [selectedUser, setSelectedUser] = React.useState<string>("");

  return (
    <>
      <AlertDialogHeader className="text-xl font-bold">
        Assign a new user to this task
      </AlertDialogHeader>
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select
          onValueChange={(uid) => {
            setSelectedUser(() => {
              return uid;
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a User" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {eligibleUsers.map((user) => {
              return (
                <SelectItem
                  key={user.uid}
                  value={user.uid}
                  className="hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80"
                >
                  {user.displayName}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
      <AlertDialogFooter>
        <AlertDialogCancel className="mr-2">Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={!selectedUser}
          onClick={() => {
            addUserToTask(selectedUser);
          }}
        >
          Add User
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
export default TaskUsers;
