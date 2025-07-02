import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const DateTimePicker = ({id}) => {
      const [openPop, setOpenPop] = React.useState(false);
  const [date, setDate] = React.useState(undefined);
  const [time, setTime] = React.useState("");;

  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

   useEffect(() => {
      const fetchDate = async () => {
        try {
          const res = await axios.get(`/api/v1/admin/Date/${id}`);
          if (res.data.success) {
          } else {
            console.log(res);
          }
        } catch (err) {
          console.error(err)
        }
  
        fetchDate();
    }}, [id]);

  return (
    <div>
      <div className="flex gap-4 justify-center items-center p-2 m-2">
       <form action="" className="flex items-center flex-col ">
         <div className="flex gap-5">
            <div className="flex flex-col gap-3">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={openPop} onOpenChange={setOpenPop}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? format(date, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpenPop(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <Input
            value={time || "10:30:00"}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            id="time-picker"
            step="1"
            defaultValue="10:30:00"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
         </div>
        <div className="flex gap-4 mt-3 w-full justify-between"v>
            <Button className="flex-1 " variant="" type="submit">Submit</Button>
            <Button className="flex-1" variant="destructive" type="reset">Reset</Button>
        </div>
       </form>
      </div>
    </div>
  );
};

export default DateTimePicker;
