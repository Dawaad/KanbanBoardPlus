import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BoardDetails = {
  name: string;
  id: string;
};

const tailwindColour = [
  "bg-blue-100",
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-600",
  "bg-blue-700",
  "bg-blue-800",
  "bg-blue-900",
];

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
