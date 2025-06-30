"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateContextDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add tasks/todo. Click Add when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Context</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Context</DrawerTitle>
          <DialogDescription>
            Add Context. Click Add when you&apos;re done.
          </DialogDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm(className) {
  const [openPop, setOpenPop] = React.useState(false);
  const [context, setContext] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Adding Context...");

    const formData = {
      context,
      description,
    };

    try {
      const response = await axios.post(
        "/api/v1/admin/tasks/create",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Context Creation Failed!", { id: toastId });
    } finally {
      setIsLoading(false);

      //   if (taskId) router.push(`/admin/tasks/details/${taskId}`);
    }
  };
  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <Label htmlFor="email">Context</Label>
        <Input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          type="text"
          id="context"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          defaultValue="My task"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full
            ${isLoading ? "cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Adding....." : "Add"}
      </Button>
    </form>
  );
}
