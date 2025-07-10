// components/PostModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function PostModal({
  open,
  onOpenChange,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "post" | "affirmation";
}) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim() && !media) {
      toast.error("Post must contain text or media.");
      return;
    }

    const formData = new FormData();
    formData.append("body", content);
    if (media) formData.append("media", media);

    try {
      setLoading(true);
      await axios.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Post created 🎉");
      onOpenChange(false);
      setContent("");
      setMedia(null);
    } catch {
      toast.error("Failed to create post ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {type === "post" ? "Create Post" : "Create Affirmation"}
          </DialogTitle>
        </DialogHeader>

        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Input
          type='file'
          accept='image/*,video/*,audio/*'
          onChange={(e) => setMedia(e.target.files?.[0] || null)}
        />

        <Button
          className='bg-gradient-to-r from-emerald-500 to-blue-500 mt-4 text-white'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
