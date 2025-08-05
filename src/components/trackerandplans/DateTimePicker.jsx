"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";

const DateTimePicker = ({ id }) => {
  const [openPop, setOpenPop] = useState(false);
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("10:30:00");
  const [countdown, setCountdown] = useState("");
  const [targetDateTime, setTargetDateTime] = useState(null);
  const router = useRouter();

  // Fetch existing date-time from backend
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const res = await axios.get(`/api/v1/admin/Date/${id}`);
        if (res.data.success && res.data.dateTime) {
          const fetchedDateTime = new Date(res.data.dateTime);
          setDate(new Date(fetchedDateTime));
          setTime(
            fetchedDateTime.toLocaleTimeString("en-GB", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
          setTargetDateTime(fetchedDateTime);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDate();
  }, [id]);

  // Countdown logic
  useEffect(() => {
    let interval;

    if (targetDateTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDateTime.getTime() - now;

        if (distance <= 0) {
          clearInterval(interval);
          setCountdown("Countdown Finished");
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          `${days}d ${hours}h ${minutes}m ${seconds}s`
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [targetDateTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      toast.error("Please select date and time");
      return;
    }

    const [hours, minutes, seconds] = time.split(":").map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, seconds, 0);

    // ✅ Start the countdown immediately
    setTargetDateTime(combinedDate);
    toast.success("Countdown started!");

    // ✅ API call to save (optional success)
    try {
      const res = await axios.post(`/api/v1/admin/Date/${id}`, {
        dateTime: combinedDate.toISOString(),
      });

      if (res.data.success) {
        toast.success("Date and time saved!");
      } else {
        toast.error("Failed to save date and time to database.");
      }
    } catch (err) {
      console.error(err);
      toast.error("API error occurred while saving.");
    }
  };

  const handleReset = () => {
    setDate(undefined);
    setTime("10:30:00");
    setTargetDateTime(null);
    setCountdown("");
    toast("Reset successful.");
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <div className="flex gap-5">
          {/* Date Picker */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="date-picker">Date</Label>
            <Popover open={openPop} onOpenChange={setOpenPop}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-36 justify-between font-normal"
                >
                  {date ? format(date, "PPP") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpenPop(false);
                  }}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="time-picker">Time</Label>
            <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              id="time-picker"
              step="1"
              className="bg-background"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-between">
          <Button className="flex-1" type="submit">
            Submit
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>

      {/* Countdown Display */}
      {targetDateTime && (
        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold">Countdown:</h2>
          <p className="text-2xl">{countdown}</p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
