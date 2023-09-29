import { Dialog, DialogTrigger } from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

type IconProps = {
  //Take in a HeroIcon and a title as props
  icon: React.ReactNode;
  title: string;
  //Takes in a modal component as a prop
  modal?: React.ReactNode;

  onClick?: () => void;
};

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  iconDetails: IconProps;
};

function SidebarSection({ className, iconDetails, ...props }: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div
            onClick={() => {
              if (iconDetails.onClick) {
                iconDetails.onClick();
              }
            }}
            className={cn(
              "flex items-center overflow-hidden hover:bg-zinc-400/30 hover:dark:bg-zinc-500/30 cursor-pointer",
              className
            )}
            {...props}
          >
            <div className="ml-2 mr-3 my-2">{iconDetails.icon}</div>
            <div className="text-base  font-semibold text-zinc-800/90 dark:text-zinc-300 truncate">
              {iconDetails.title}
            </div>
          </div>
        </DialogTrigger>
        {iconDetails.modal}
      </Dialog>
    </>
  );
}

export default SidebarSection;
