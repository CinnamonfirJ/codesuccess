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
import { Loader2, UploadCloud } from "lucide-react";

export default function PostModal({
  open,
  onOpenChange,
  type,
  onPostCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "post" | "affirmation";
  onPostCreated?: () => void; // Optional callback
}) {
  const [content, setContent] = useState("");
  const maxChars = 255;

  const isOverLimit = content.length > maxChars;
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
        onPostCreated?.();
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
      <DialogContent className='bg-white shadow-lg p-6 rounded-2xl max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-semibold text-gray-800 text-2xl'>
            {type === "post" ? "Create Post" : "Create Affirmation"}
          </DialogTitle>
        </DialogHeader>

        <div className='w-full'>
          <Textarea
            placeholder='Share your thoughts...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full p-2 rounded-lg border ${
              isOverLimit ? "border-red-500" : "border-gray-300"
            } focus-visible:ring-emerald-500 resize-none max-h-32`}
            rows={5}
          />
          <div className='flex justify-between mt-1 text-sm'>
            <p className='text-gray-500'>
              You can only input {maxChars} characters
            </p>
            <p className={`${isOverLimit ? "text-red-500" : "text-gray-500"}`}>
              {Math.max(0, maxChars - content.length)} characters left
            </p>
          </div>
        </div>

        <label
          htmlFor='mediaUpload'
          className='flex justify-center items-center gap-2 p-3 border-2 hover:border-emerald-400 border-dashed rounded-lg text-gray-600 transition-colors cursor-pointer'
        >
          <UploadCloud className='w-5 h-5' />
          {media ? media.name : "Click to upload image, video or audio"}
          <Input
            id='mediaUpload'
            type='file'
            accept='image/*,video/*,audio/*'
            className='hidden'
            onChange={handleMediaChange}
          />
        </label>

        {previewUrl && (
          <div className='border border-gray-200 rounded-lg overflow-hidden'>
            <Image
              src={previewUrl}
              alt='Preview'
              width={500}
              height={300}
              className='w-full h-40 md:h-64 object-cover'
            />
          </div>
        )}

        <Button
          className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 mt-4 w-full text-white transition-colors'
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
