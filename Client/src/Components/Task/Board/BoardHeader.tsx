import React from "react";
import {} from "@heroicons/react/24/solid";
interface IProps {
  code: string | undefined;
}

function BoardHeader({ code }: IProps) {
  return (
    <section className="h-[3rem]  flex justify-center items-center">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200/80">{code}</h1>
    </section>
  );
}

export default BoardHeader;
