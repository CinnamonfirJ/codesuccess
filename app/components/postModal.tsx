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
      <DialogContent className='space-y-2 bg-white shadow-lg p-6 rounded-2xl max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-semibold text-gray-800 text-2xl'>
            {type === "post" ? "Create Post" : "Create Affirmation"}
          </DialogTitle>
        </DialogHeader>

        <Textarea
          placeholder='Share your thoughts...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border-gray-300 rounded-lg focus-visible:ring-emerald-500 min-h-[120px]'
        />

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

        {/* {previewUrl && (
          <div className='mt-3 border border-gray-200 rounded-lg overflow-hidden'>
            <Image
              src={previewUrl}
              alt='Preview'
              width={500}
              height={300}
              className='w-full h-40 object-cover'
            />
          </div>
        )} */}

        {previewUrl && (
  <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
    {media?.type.startsWith("image/") && (
      <Image
        src={previewUrl}
        alt="Image Preview"
        width={500}
        height={300}
        className="w-full h-40 object-cover"
      />
    )}

    {media?.type.startsWith("video/") && (
      <video
        controls
        src={previewUrl}
        className="w-full h-40 object-cover bg-black"
      />
    )}

    {media?.type.startsWith("audio/") && (
      <audio
        controls
        src={previewUrl}
        className="w-full bg-gray-100"
      />
    )}
  </div>
)}


        <Button
          className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 mt-2 w-full text-white transition-colors'
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
