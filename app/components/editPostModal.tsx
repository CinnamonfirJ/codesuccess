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
import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, UploadCloud } from "lucide-react";

type PostType = {
  id: number;
  body: string;
  author: number;
  author_username: string;
  author_full_name: string;
  author_image: string;
  media?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  isAffirmation?: boolean;
  liked_by_user?: boolean;
  likes_count?: number;
  comments_count?: number;
  shares?: number;
  timestamp?: string;
  is_retweet?: boolean;
  is_qoute_retweet?: boolean;
  quote_text?: string;
  scheduled_at?: string;
};

interface EditPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number;
  initialBody: string;
  initialMediaUrl?: string;
  onPostUpdated: (updatedPost: PostType) => void;
}

export default function EditPostModal({
  open,
  onOpenChange,
  postId,
  initialBody,
  initialMediaUrl,
  onPostUpdated,
}: EditPostModalProps) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setContent(initialBody);
    setMedia(null);
    setPreviewUrl(initialMediaUrl || null);
  }, [initialBody, initialMediaUrl, open]);

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

      const res = await fetch(`/api/posts/${postId}/`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data: PostType = await res.json();
      if (res.ok) {
        setContent("");
        setMedia(null);
        setPreviewUrl(null);
        onOpenChange(false);
        onPostUpdated(data);
      } else {
        console.error("Error updating post:", data);
        alert("Failed to update post. Try again.");
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
            Edit Post
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
          {media
            ? media.name
            : initialMediaUrl
              ? "Change existing media"
              : "Click to upload image, video or audio"}
          <Input
            id='mediaUpload'
            type='file'
            accept='image/*,video/*,audio/*'
            className='hidden'
            onChange={handleMediaChange}
          />
        </label>

        {previewUrl && (
          <div className='mt-3 border border-gray-200 rounded-lg overflow-hidden'>
            {previewUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
              <Image
                src={previewUrl}
                alt='Preview'
                width={500}
                height={300}
                className='w-full h-40 object-cover'
              />
            ) : previewUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                controls
                src={previewUrl}
                className='w-full h-40 object-cover'
              />
            ) : previewUrl.match(/\.(mp3|wav|ogg)$/i) ? (
              <audio controls src={previewUrl} className='w-full' />
            ) : (
              <div className='p-4 text-gray-500 text-center'>
                Unsupported media type for preview. URL: {previewUrl}
              </div>
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
              <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Updating...
            </>
          ) : (
            "Update Post"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
