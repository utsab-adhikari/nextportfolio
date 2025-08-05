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
import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ReportDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const sharedContent = (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="text-sm text-gray-400 mb-4">
        Share your feedback, report bugs, or suggest improvements.
      </div>
      <SubjectForm onClose={() => setOpen(false)} />
    </motion.div>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition">Feedback / Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-900/95 backdrop-blur-lg border border-indigo-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Feedback / Report</DialogTitle>
        </DialogHeader>
        {sharedContent}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition">Feedback / Report</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-900/95 backdrop-blur-lg border-t border-indigo-700">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-white text-xl">Feedback / Report</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">{sharedContent}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white" variant="secondary">Cancel</Button>
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
      const response = await axios.post("/api/feedback", { title, description });
      if (response.data.success) {
        toast.success(response.data.message || "Feedback submitted!", { id: toastId });
        setTitle("");
        setDescription("");
        onClose?.();
        router.refresh();
      } else {
        toast.error(response.data.message || "Submission failed.", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to submit feedback.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="title" className="text-gray-300">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter feedback title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-slate-800 border-indigo-700 text-white focus:ring-indigo-500"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description" className="text-gray-300">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-800 border-indigo-700 text-white focus:ring-indigo-500"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full bg-indigo-600 hover:bg-indigo-500 text-white",
          isLoading && "cursor-not-allowed opacity-70"
        )}
      >
        {isLoading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}