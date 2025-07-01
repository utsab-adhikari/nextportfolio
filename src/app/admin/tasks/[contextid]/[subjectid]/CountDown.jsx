"use client";

import React, { useState, useEffect } from "react";
import { format, differenceInSeconds } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function pad(num) {
  return num.toString().padStart(2, "0");
}

const CountdownTimer = () => {
  const now = new Date();

  // Initialize date to today and time to current time formatted as HH:mm:ss
  const initialTime = format(now, "HH:mm:ss");

  const [date, setDate] = useState(now);
  const [time, setTime] = useState(initialTime);
  const [openPop, setOpenPop] = useState(false);

  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    let interval;

    if (isCounting && !isPaused && date && time) {
      interval = setInterval(() => {
        const now = new Date();
        const target = new Date(date);

        const [hours, minutes, seconds] = time.split(":").map(Number);
        target.setHours(hours);
        target.setMinutes(minutes);
        target.setSeconds(seconds || 0);

        const diffInSeconds = Math.max(0, differenceInSeconds(target, now));

        if (diffInSeconds <= 0) {
          clearInterval(interval);
          setCountdown({
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
          });
          setIsCounting(false);
          setIsPaused(false);
        } else {
          const days = Math.floor(diffInSeconds / (60 * 60 * 24));
          const hours = Math.floor(
            (diffInSeconds % (60 * 60 * 24)) / (60 * 60)
          );
          const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
          const seconds = diffInSeconds % 60;

          setCountdown({
            days: pad(days),
            hours: pad(hours),
            minutes: pad(minutes),
            seconds: pad(seconds),
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting, isPaused, date, time]);

  const handleStartPause = () => {
    if (!isCounting) {
      setIsCounting(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    const now = new Date();
    setIsCounting(false);
    setIsPaused(false);
    setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
    setDate(now);
    setTime(format(now, "HH:mm:ss"));
  };

  const isStartDisabled = !date || !time || (isCounting && !isPaused);

  return (
    <div className="mx-auto mt-12 bg-white border-1 shadow-lg rounded-2xl p-6 sm:p-8 ">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-8 text-center">
        Countdown Timer
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 justify-evenly items-center">
        {/* Date Picker */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Label htmlFor="date-picker" className="font-semibold text-gray-700">
            Date
          </Label>
          <Popover open={openPop} onOpenChange={setOpenPop}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-full sm:w-36 justify-between font-normal text-gray-700 hover:bg-indigo-50"
              >
                {date ? format(date, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0 shadow-lg rounded-lg"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setOpenPop(false);
                }}
                fromDate={new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Label htmlFor="time-picker" className="font-semibold text-gray-700">
            Time
          </Label>
          <Input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            id="time-picker"
            step="1"
            className="w-full sm:w-36 bg-gray-50 border border-gray-300 rounded-md focus:ring-indigo-400 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex w-full md:w-[40vw] text-center mx-auto gap-4 mt-8 justify-center items-center">
        <Button
          onClick={handleStartPause}
          disabled={isStartDisabled}
          className={`flex-1 sm:flex-auto font-semibold ${
            isStartDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isCounting ? (isPaused ? "Resume" : "Pause") : "Start"}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1 sm:flex-auto font-semibold text-indigo-700 border-indigo-700 hover:bg-indigo-50"
        >
          Reset
        </Button>
      </div>

      {/* Countdown Display */}
      <div className="mt-12 text-center text-4xl sm:text-5xl font-mono font-bold tracking-wide text-indigo-800 select-none">
        {countdown.days}d : {countdown.hours}h : {countdown.minutes}m :{" "}
        {countdown.seconds}s
      </div>

      {/* Finished Message */}
      {!isCounting &&
        countdown.days === "00" &&
        countdown.hours === "00" &&
        countdown.minutes === "00" &&
        countdown.seconds === "00" && (
          <p className="mt-6 text-center text-lg font-semibold text-red-600 animate-pulse">
            🎉 Countdown Finished!
          </p>
        )}
    </div>
  );
};

export default CountdownTimer;
