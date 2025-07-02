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

export default function CreateSubjectDrawer({ contextid }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Subject</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>
            <DialogDescription>
              Add subject under this context. Click Add when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <SubjectForm contextid={contextid} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Subject</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Subject</DrawerTitle>
          <DialogDescription>
            Add subject under this context. Click Add when you&apos;re done.
          </DialogDescription>
        </DrawerHeader>
        <SubjectForm className="px-4" contextid={contextid} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SubjectForm({ className, contextid }) {
  const [subject, setSubjectName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  console.log(contextid);

  const formData = {
    subject,
    description,
    context: contextid,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Adding Subject...");

    try {
      const response = await axios.post(
        `/api/v1/admin/tasks/${contextid}/create`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        setSubjectName("");
        setDescription("");
        router.refresh();
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Subject Creation Failed!", { id: toastId });
    } finally {
      setIsLoading(false);
      router.refresh();

      document.getElementById("drawer-close-button").click();
    }
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <Label htmlFor="subjectName">Subject Name</Label>
        <Input
          id="subjectName"
          type="text"
          placeholder="Enter Subject Name"
          value={subject}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <DrawerClose asChild>
        <button id="drawer-close-button" className="hidden"></button>
      </DrawerClose>

      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full ${isLoading ? "cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Adding..." : "Add Subject"}
      </Button>
    </form>
  );
}
