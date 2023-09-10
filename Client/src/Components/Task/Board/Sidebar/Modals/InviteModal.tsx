import React from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/Components/ui/alert-dialog";
import useInvite from "@/Hooks/useInvite";
import { Skeleton } from "@/Components/ui/skeleton";
type InviteProps = {
  boardID: string;
};

function InviteModal(boardID: InviteProps) {
  console.log(boardID.boardID);
  const invite = useInvite(boardID.boardID);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex justify-center text-xl pb-4">
          Invite Others
        </AlertDialogTitle>
        <AlertDialogDescription className="">
          Send this invite code to another person to allow them to join this
          board.
        </AlertDialogDescription>
        <AlertDialogTitle className="flex justify-center text-3xl font-bold py-4">
          {invite.loading ? (
            <Skeleton className="w-full h-[3rem]" />
          ) : (
            <h2>{invite.inviteCode}</h2>
          )}
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>OK</AlertDialogCancel>
        {/*Implement Sharing Feature Through Email Later On*/}
        <AlertDialogAction>Share</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default InviteModal;
