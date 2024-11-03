"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface PopDatePickerProps {
  currentDate: Date;
  disabled?: boolean;
  applyDate: (date?: Date) => void;
}

export function PopDatePicker({
  currentDate,
  applyDate,
  disabled = false
}: PopDatePickerProps) {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (currentDate) {
      setDate(currentDate);
    }
  }, [currentDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={applyDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
