import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import useInvite from "@/Hooks/useInvite";
import { Skeleton } from "@/Components/ui/skeleton";
import { TBoard } from "@/Types/FirebaseTypes";
import { Button } from "@/Components/ui/button";

type InviteProps = {
  board: TBoard;
};

function InviteModal(board: InviteProps) {
  if (!board.board) {
    return null;
  }
  const invite = useInvite(board.board.id);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex justify-center text-xl pb-4">
          Invite Others
        </DialogTitle>
        <DialogDescription className="">
          Send this invite code to another person to allow them to join this
          board.
        </DialogDescription>
        <DialogTitle className="flex justify-center text-3xl font-bold py-4">
          {invite.loading ? (
            <Skeleton className="w-full h-[3rem]" />
          ) : (
            <h2>{invite.inviteCode}</h2>
          )}
        </DialogTitle>
      </DialogHeader>
      <DialogFooter>
        {/*Implement Sharing Feature Through Email Later On*/}
        <DialogTrigger>
          <Button>Share</Button>
        </DialogTrigger>
      </DialogFooter>
    </DialogContent>
  );
}

export default InviteModal;
