import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

import { Input } from "@/Components/ui/input";

import react, { useState } from "react";
import { Button } from "@/Components/ui/button";
type ColumnModalProps = {
  callBack: (title: string) => void;
};

function AddColumn({ callBack }: ColumnModalProps) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-5 md:w-72 bg-zinc-100/40 dark:bg-zinc-800/50 text-zinc-800/80 dark:text-zinc-400 hover:bg-zinc-300/80 dark:hover:bg-zinc-700/40 ">
          Add New Column
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Add New Column To Board</AlertDialogTitle>
        <AlertDialogDescription>Enter a column title </AlertDialogDescription>

        <Input
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/*Disable the action button if title is empty */}
          <AlertDialogAction
            disabled={title.length === 0}
            onClick={() => [callBack(title), setTitle("")]}
          >
            Add Column
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddColumn;
