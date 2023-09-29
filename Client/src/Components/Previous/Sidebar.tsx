import React, { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { Calendar } from "../ui/calendar";

type sidebarProps = {
  callBack: (date: Date | undefined) => void;
  date: Date | undefined;
};

function Sidebar(props: sidebarProps) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={` absolute top-0 bottom-0 right-0 dark:bg-zinc-800 md:relative border bg-zinc-100 md:dark:bg-zinc-800/70 transition-all ${
        open ? " w-full md:w-[20rem]" : "w-[2rem] "
      } origin-left`}
    >
      <button
        className={`absolute right-0 bottom-1/3  md:translate-x-[2rem] text-zinc-800 dark:text-zinc-300 duration-500 ${
          open ? "rotate-0 md:rotate-180" : "rotate-180 md:rotate-0"
        } transition-all`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ArrowRightCircleIcon className="w-16  h-16" />
      </button>
      <header
        className={`flex justify-center p-8 ${
          !open ? "scale-0" : "scale-100"
        } transition-all origin-left duration-100`}
      >
        <h1 className="text-xl md:text-2xl font-bold">Select a Date</h1>
      </header>
      <section
        className={`flex justify-center  ${
          !open ? "scale-0" : "scale-100"
        } transition-all origin-left duration-100 h-[30rem] items-center`}
      >
        <Calendar
          className="  bg-zinc-800 rounded-lg"
          mode="single"
          selected={props.date}
            onSelect={(date) => {
                props.callBack(date);
            }}
          disabled={(date) => date > new Date()}
          initialFocus
        />
      </section>
    </aside>
  );
}

export default Sidebar;
