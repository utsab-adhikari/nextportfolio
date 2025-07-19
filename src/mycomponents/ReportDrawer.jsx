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

export default function ReportDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const sharedContent = (
    <>
      <div className="text-sm text-muted-foreground mb-4">
        Let us know your thoughts, bugs, or issues you’ve encountered.
      </div>
      <SubjectForm onClose={() => setOpen(false)} />
    </>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-blue-500 px-3 cursor-pointer py-1 rounded hover:bg-blue-400"
          variant="outline"
        >
          Feedback / Report
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-white">Feedback / Report</DialogTitle>
        </DialogHeader>
        {sharedContent}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="bg-blue-500 px-3 cursor-pointer py-1 rounded hover:bg-blue-400"
          variant="outline"
        >
          Feedback / Report
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-900">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-white">Feedback / Report</DrawerTitle>
        </DrawerHeader>
        <div className="px-4" >{sharedContent}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="bg-stone-700 hover:bg-stone-600 cursor-pointer text-white" variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SubjectForm({ onClose }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Submitting feedback...");

    try {
      const response = await axios.post("/api/feedback", {
        title,
        description,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Feedback submitted!", {
          id: toastId,
        });
        setTitle("");
        setDescription("");
        onClose?.(); // Close dialog or drawer
        router.refresh();
      } else {
        toast.error(response.data.message || "Submission failed.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to submit feedback.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="bg grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter your feedback title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter more details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full bg-green-600 hover:bg-green-700 cursor-pointer",
          isLoading && "cursor-not-allowed"
        )}
      >
        {isLoading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}
