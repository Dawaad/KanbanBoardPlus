import React from "react";
import { Skeleton } from "../ui/skeleton";
function LoadingTiles() {
  return (
    <section className="flex items-center">
      <Skeleton className="m-4 md:w-[11rem] lg:w-[13rem] h-[7rem] rounded-md" />
      <Skeleton className="m-4 md:w-[11rem] lg:w-[13rem] h-[7rem] rounded-md" />
      <Skeleton className="m-4 md:w-[11rem] lg:w-[13rem] h-[7rem] rounded-md" />
    </section>
  );
}

export default LoadingTiles;
