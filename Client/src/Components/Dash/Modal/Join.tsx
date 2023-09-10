import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/Components/ui/alert-dialog";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { PlusIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
type InviteProps = {
  userID: string | undefined;
};

function JoinInvite(userID: InviteProps) {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleInviteRequest = () => {
    axios
      .post("http://localhost:3000/api/invite/join", {
        inviteCode: inviteCode,
        userID: userID.userID,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === "user-in-board") {
            setError(true);
          } else {
            navigate(`/board/${res.data}`);
          }
        }
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="m-4 md:w-[11rem] lg:w-[13rem] bg-zinc-300/70 hover:bg-zinc-400/70 dark:bg-zinc-700/30 dark:hover:bg-zinc-700/60 h-[7rem] transition-all  flex justify-center items-center shadow-md shadow-zinc-800 dark:shadow-none rounded-md">
          <PlusIcon className="h-10 w-10 text-zinc-800/80 dark:text-zinc-200/80" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Join a new board</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your invite code to join a new board.
          </AlertDialogDescription>
          {error ? (
            <div className="text-red-400">
              You are already a member of this board
            </div>
          ) : (
            <></>
          )}
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInviteCode(event.target.value);
            }}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setError(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => {
              handleInviteRequest();
            }}
          >
            Join
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default JoinInvite;
