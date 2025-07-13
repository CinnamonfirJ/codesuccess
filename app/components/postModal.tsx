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
import Image from "next/image";
import { Loader2 } from "lucide-react";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleSubmit() {
    if (!content) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("body", content);
      if (media) {
        formData.append("media", media);
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setContent("");
        setMedia(null);
        setPreviewUrl(null);
        onOpenChange(false);
      } else {
        console.error("Error creating post:", data);
        alert("Failed to post. Try again.");
      }
    } catch (err) {
      console.error("Post error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='p-6 max-w-md'>
        <DialogHeader>
          <DialogTitle className='mb-2 font-bold text-2xl'>
            {type === "post" ? "Create Post" : "Create Affirmation"}
          </DialogTitle>
        </DialogHeader>

        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='min-h-[120px]'
        />

        <Input
          type='file'
          accept='image/*,video/*,audio/*'
          onChange={handleMediaChange}
        />

        {previewUrl && (
          <div className='mt-4 border border-gray-200 rounded-lg overflow-hidden'>
            <Image
              src={previewUrl}
              alt='Preview'
              width={500}
              height={300}
              className='w-full h-auto object-cover'
            />
          </div>
        )}

        <Button
          className='bg-gradient-to-r from-emerald-500 to-blue-500 mt-4 w-full text-white'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
