import React from "react";
import {} from '@heroicons/react/24/solid'
interface IProps {
  code: string | undefined;
}

function BoardHeader({ code }: IProps) {
  return (
    <section className="h-[2.5rem]  flex  bg-zinc-300/30  dark:bg-zinc-500/30 border-b border-b-slate-400 dark:border-b-slate-500">
      <div className="items-center justify-between flex mx-5 ">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-300/80">{code}</h1>
      </div>
    </section>
  );
}

export default BoardHeader;
