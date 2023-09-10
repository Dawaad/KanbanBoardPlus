import { Skeleton } from "@/Components/ui/skeleton";
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:flex gap-5 mx-16 py-8">
      {[1, ...Array(4)].map((index: number) => {
        return (
          <Skeleton
            key={`column-skeleton-${index}`}
            className="p-2 rounded-2xl w-[20rem] h-[40rem]"
          />
        );
      })}
    </div>
  );
}

export default LoadingSkeleton;
