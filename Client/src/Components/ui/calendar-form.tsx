import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/Components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type calendarFormProps = {
  callBack: (date: Date | undefined) => void;
  date: Date | undefined;
};

function CalendarForm({ date, callBack }: calendarFormProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] pl-3 text-left font-normal")}
        >
          {date ? (
              format(date, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            callBack(date);
          }}
          disabled={(date) => date < new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default CalendarForm;
