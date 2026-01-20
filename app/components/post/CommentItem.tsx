"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import type { CommentType } from "@/app/types/post";

interface CommentItemProps {
  comment: CommentType;
  postId: number;
  onCommentPosted: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  postId,
  onCommentPosted,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [postingReply, setPostingReply] = useState(false);

  const handlePostReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    setPostingReply(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: postId,
          content: replyContent,
          parent: comment.id,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to post reply");
      }

      toast.success("Reply posted successfully!");
      setReplyContent("");
      setShowReplyInput(false);
      onCommentPosted();
    } catch (error: any) {
      console.error("Error posting reply:", error);
      toast.error(error.message || "Failed to post reply.");
    } finally {
      setPostingReply(false);
    }
  };

  return (
    <div className='flex items-start gap-3'>
      <Avatar className='border border-gray-100 w-8 h-8'>
        <AvatarImage
          src={comment.author_image || "/placeholder.svg"}
          alt={comment.author_username}
        />
        <AvatarFallback className='bg-blue-50 text-blue-700 text-xs'>
          {comment.author_username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex-1 bg-gray-50 p-3 border border-gray-100 rounded-lg'>
        <p className='font-semibold text-gray-800 text-sm'>
          {comment.author_username}
        </p>
        <p className='mt-1 text-gray-600 text-sm'>{comment.content}</p>
        <p className='mt-1 text-gray-400 text-xs'>
          {moment(comment.commented_at).format("MMMM Do YYYY, h:mm a")}
        </p>
        <Button
          variant='ghost'
          size='sm'
          className='hover:bg-blue-100 mt-2 px-2 py-1 rounded-md text-blue-600 text-xs'
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          Reply
        </Button>

        {showReplyInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='flex items-center gap-2 mt-3'
          >
            <Input
              type='text'
              placeholder={`Reply to ${comment.author_username}...`}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className='flex-1 border-gray-300 focus:border-emerald-500 rounded-full focus:ring-emerald-500 text-sm'
              onKeyPress={(e) => {
                if (e.key === "Enter" && !postingReply) {
                  handlePostReply();
                }
              }}
            />
            <Button
              size='icon'
              className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 rounded-full w-8 h-8 text-white'
              onClick={handlePostReply}
              disabled={postingReply}
            >
              {postingReply ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <Send className='w-4 h-4' />
              )}
            </Button>
          </motion.div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className='space-y-4 mt-4 ml-6 pl-4 border-gray-200 border-l'>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                onCommentPosted={onCommentPosted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
