import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BoardDetails = {
  name: string;
  id: string;
};



type Props = React.HTMLAttributes<HTMLAnchorElement> & {
  boardDetails: BoardDetails;
};

function DashboardTile({ className, boardDetails, ...props }: Props) {
  return (
    <Link
      to={`board/${boardDetails?.id}`}
      className={cn(
        "m-4 md:w-[11rem] lg:w-[13rem] h-[7rem] transition-all bg-slate-300 flex justify-center items-center shadow-md shadow-zinc-800 dark:shadow-none rounded-md hover:opacity-70",
        className
      )}
      {...props}
    >
      <h1 className="font-semibold text-zinc-900">{boardDetails?.name}</h1>
    </Link>
  );
}

export default DashboardTile;
