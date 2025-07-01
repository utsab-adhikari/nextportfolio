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

export default function CreateTopicDrawer({ contextid , subjectid}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Topic</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Topic</DialogTitle>
            <DialogDescription>
              Add Topic under this subject. Click Add when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <SubjectForm contextid={contextid} subjectid={subjectid} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Topic</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Topic</DrawerTitle>
          <DialogDescription>
            Add Topic under this context. Click Add when you&apos;re done.
          </DialogDescription>
        </DrawerHeader>
        <SubjectForm className="px-4" contextid={contextid} subjectid={subjectid} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SubjectForm({ className, contextid, subjectid }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const formData = {
    title,
    description,
    subject: subjectid,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Adding Topic...");


    try {
      const response = await axios.post(
        `/api/v1/admin/tasks/${contextid}/${subjectid}/create`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        setTitle("");
        setDescription("");
        router.refresh();
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Subject Creation Failed!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <Label htmlFor="topic">Title</Label>
        <Input
          id="topic"
          type="text"
          placeholder="Enter Title Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
