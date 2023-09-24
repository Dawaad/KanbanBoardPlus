import React, { useEffect } from "react";
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
import { Textarea } from "@/Components/ui/textarea";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@/Components/ui/calendar";
import { TUser } from "@/Types/FirebaseTypes";
import CalendarForm from "@/Components/ui/calendar-form";
type TaskModalProps = {
  callBack: (title: string, description: string, date: Date) => void;
  isBacklogColumn: boolean;
};

function AddTask({ callBack, isBacklogColumn }: TaskModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [future, setFuture] = useState<boolean>(false);

  const handleDateUpdate = (date: Date | undefined) => {
    setDate(date);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-green-500 hover:text-green-700">
          <PlusCircleIcon className="h-8 w-8" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Add New Task</AlertDialogTitle>
        <AlertDialogDescription>Enter a task title</AlertDialogDescription>
        <Input
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <AlertDialogDescription>
          Enter a task description
        </AlertDialogDescription>
        <Textarea
          className="h-20"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <AlertDialogDescription>Active Date</AlertDialogDescription>
        <section className="flex flex-col md:flex-row items-center justify-evenly">
          <div className="flex flex-row space-x-5">
            <div>
              <input
                defaultChecked={!isBacklogColumn}
                disabled={isBacklogColumn}
                type="radio"
                name="date"
              />
              <span
                className={`ml-2 ${
                  isBacklogColumn ? "text-zinc-400" : "text-zinc-100"
                }`}
              >
                Now
              </span>
            </div>

            <div className="flex justify-center">
              <input
                defaultChecked={isBacklogColumn}
                disabled={!isBacklogColumn}
                type="radio"
                name="date"
                onClick={() => {
                  setFuture(true);
                }}
              />
              <span
                className={`ml-2 ${
                  !isBacklogColumn ? "text-zinc-400" : "text-zinc-100"
                }`}
              >
                Future
              </span>
            </div>
          </div>
          <div className={`${isBacklogColumn ? "scale-100" : "scale-0"}`}>
            <CalendarForm date={date} callBack={handleDateUpdate} />
          </div>
        </section>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setTitle("");
              setDescription("");
              setDate(undefined);
            }}
          >
            Cancel
          </AlertDialogCancel>
          {/*Disable the action button if title is empty */}
          <AlertDialogAction
            disabled={title.length === 0 || (isBacklogColumn && !date)}
            onClick={() => {
              callBack(
                title,
                description,
                !future ? new Date() : date ? date : new Date()
              );
              setTitle("");
              setDescription("");
              console.log(date);
            }}
          >
            Add Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddTask;
