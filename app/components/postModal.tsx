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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, UploadCloud, XCircle } from "lucide-react";

export default function PostModal({
  open,
  onOpenChange,
  type,
  onPostCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: string; // coming from LeftSidebar
  onPostCreated?: () => void;
}) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState<string>("");

  const postTypes = [
    "Advertise your Biz",
    "Share a new goal",
    "Share your Journey",
    "Share your determination",
    "Share something encouraging",
    "Share your Joy",
    "Nominate a hero",
  ];

  // 🪄 Whenever modal opens with a specific postType, prefill it
  useEffect(() => {
    if (open && type) {
      setPostType(type);
    }
  }, [open, type]);

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleClearType() {
    setPostType("");
  }

  async function handleSubmit() {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("body", content);
      if (media) formData.append("media", media);
      if (postType) formData.append("postType", postType);

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setContent("");
        setMedia(null);
        setPreviewUrl(null);
        setPostType("");
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
      <DialogContent className='space-y-3 bg-white shadow-lg p-6 rounded-2xl max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-semibold text-gray-800 text-2xl'>
            {type === "affirmation" ? "Create Affirmation" : "Create Post"}
          </DialogTitle>
        </DialogHeader>

        {/* Post Type Selector */}
        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>
              Choose post type (optional)
            </label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className='border-gray-300 rounded-lg w-full'>
                <SelectValue placeholder='Normal Post' />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((pt) => (
                  <SelectItem key={pt} value={pt}>
                    {pt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Button */}
          {postType && (
            <Button
              variant='ghost'
              size='icon'
              onClick={handleClearType}
              title='Clear post type'
              className='mt-6 text-gray-500 hover:text-red-500 transition-colors'
            >
              <XCircle className='w-5 h-5' />
            </Button>
          )}
        </div>

        {/* Post Content */}
        <Textarea
          placeholder='Share your thoughts...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border-gray-300 rounded-lg focus-visible:ring-emerald-500 min-h-[120px]'
        />

        {/* Media Upload */}
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

        {/* Media Preview */}
        {previewUrl && (
          <div className='mt-3 border border-gray-200 rounded-lg overflow-hidden'>
            {media?.type.startsWith("image/") && (
              <Image
                src={previewUrl}
                alt='Image Preview'
                width={500}
                height={300}
                className='w-full h-40 object-cover'
              />
            )}
            {media?.type.startsWith("video/") && (
              <video
                controls
                src={previewUrl}
                className='bg-black w-full h-40 object-cover'
              />
            )}
            {media?.type.startsWith("audio/") && (
              <audio controls src={previewUrl} className='bg-gray-100 w-full' />
            )}
          </div>
        )}

        {/* Post Button */}
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
