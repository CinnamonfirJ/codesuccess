"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
  Send,
  Bookmark,
  TrendingUp,
  Loader2, // Added for loading indicator
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // Added for comment input
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Define the type for a single comment
type CommentType = {
  id: number;
  post: number;
  author: string; // Assuming author is a string (name or username)
  content: string;
  created_at: string;
  parent?: number | null; // For nested comments, if applicable
};

// Define the type for a single post
type PostType = {
  id: number;
  body: string;
  author: string;
  media?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  isAffirmation?: boolean;
  isLiked?: boolean;
  likes?: number;
  comments?: number;
  shares?: number;
  timestamp?: string; // Assuming this is a formatted string like "2 hours ago"
};

// Props for the PostCard component
interface PostCardProps {
  post: PostType;
  isLiked: boolean;
  toggleLike: (postId: number) => void;
}

// AudioAffirmation component (remains the same)
const AudioAffirmation = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className='flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 my-4 p-4 border border-emerald-200 rounded-xl'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant='outline'
        size='icon'
        className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-lg mr-4 border-0 rounded-full w-12 h-12 text-white'
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <Pause className='w-5 h-5' />
        ) : (
          <Play className='w-5 h-5' />
        )}
      </Button>
      <div className='flex-1'>
        <div className='bg-gray-200 mb-2 rounded-full h-2'>
          <motion.div
            className='bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full h-2'
            initial={{ width: "0%" }}
            animate={{ width: isPlaying ? "33%" : "33%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className='flex justify-between text-gray-600 text-xs'>
          <span>0:45</span>
          <span className='font-medium'>Daily Affirmation</span>
          <span>2:30</span>
        </div>
      </div>
    </motion.div>
  );
};

// Main PostCard component
export default function PostCard({ post, isLiked, toggleLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  // Function to fetch comments for the current post
  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments.");
    } finally {
      setLoadingComments(false);
    }
  };

  // Effect to fetch comments when showComments becomes true
  useEffect(() => {
    if (showComments && comments.length === 0) {
      fetchComments();
    }
  }, [showComments, post.id]); // Add post.id to dependencies

  // Function to handle posting a new comment
  const handlePostComment = async () => {
    if (!newCommentContent.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    setPostingComment(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: post.id,
          content: newCommentContent,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to post comment");
      }

      toast.success("Comment posted successfully!");
      setNewCommentContent(""); // Clear the input field
      fetchComments(); // Re-fetch comments to show the new one
    } catch (error: any) {
      console.error("Error posting comment:", error);
      toast.error(error.message || "Failed to post comment.");
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-shadow duration-300'>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Avatar className='border-2 border-gray-200'>
              <AvatarImage
                src={post.author || "/placeholder.svg"} // Assuming post.author can be used as image src or fallback
                alt={post.author}
              />
              <AvatarFallback className='bg-gradient-to-r from-emerald-100 to-blue-100 font-bold text-emerald-800'>
                {post.author.charAt(0).toUpperCase()}{" "}
                {/* Display first initial of author */}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-gray-900'>{post.author}</p>
                {/* This indicates the author is verified (placeholder logic) */}
                {post.author && ( // Simplified verification check
                  <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-5 h-5'>
                    <span className='text-white text-xs'>✓</span>
                  </div>
                )}
              </div>
              <p className='text-gray-500 text-sm'>{post.timestamp}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-gray-100 rounded-full'
            >
              <Bookmark className='w-4 h-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-gray-100 rounded-full'
            >
              <MoreHorizontal className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-3'>
        <p
          className={`leading-relaxed ${post.isAffirmation ? "text-lg font-medium text-gray-800 italic" : "text-gray-800"}`}
        >
          {post.body}
        </p>

        {post.tags && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {post.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant='outline'
                className='bg-gray-50 px-2 py-1 border-gray-200 text-gray-600 text-xs'
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {post.isAffirmation && <AudioAffirmation />}

        {post.media && (
          <motion.div
            className='mt-4 border border-gray-200 rounded-xl overflow-hidden'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={post.media || "/placeholder.svg"}
              alt='Post content'
              className='w-full h-auto object-cover'
              width={600}
              height={400}
            />
          </motion.div>
        )}
      </CardContent>

      <CardFooter className='pt-0'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-3 text-gray-500 text-sm'>
            <div className='flex items-center gap-4'>
              <span className='flex items-center gap-1'>
                <Heart className='w-4 h-4 text-red-500' />
                {post?.likes
                  ? post.likes +
                    (isLiked && !post.isLiked
                      ? 1
                      : isLiked || post.isLiked
                        ? 0
                        : 0)
                  : 0}{" "}
                likes
              </span>
              <span className='flex items-center gap-1'>
                <TrendingUp className='w-4 h-4' />
                Trending
              </span>
            </div>
            <span>
              {post.comments} comments • {post.shares} shares
            </span>
          </div>
          <Separator className='mb-3' />
          <div className='flex justify-between'>
            <Button
              variant='ghost'
              size='sm'
              className={`flex-1 gap-2 transition-colors ${
                isLiked
                  ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                  : "text-gray-600 hover:text-red-500 hover:bg-red-50"
              }`}
              onClick={() => toggleLike(post.id)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex-1 gap-2 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
              onClick={() => setShowComments(!showComments)} // Toggle comments section
            >
              <MessageSquare className='w-4 h-4' />
              Comment
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex-1 gap-2 hover:bg-emerald-50 text-gray-600 hover:text-emerald-500'
            >
              <Share2 className='w-4 h-4' />
              Share
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='mt-4 pt-4 border-gray-200 border-t'
            >
              <h4 className='mb-3 font-semibold text-gray-800'>Comments</h4>
              {loadingComments ? (
                <div className='flex justify-center items-center py-4'>
                  <Loader2 className='w-5 h-5 text-gray-500 animate-spin' />
                  <span className='ml-2 text-gray-500'>
                    Loading comments...
                  </span>
                </div>
              ) : comments.length === 0 ? (
                <p className='text-gray-500 text-sm'>
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <div className='space-y-4'>
                  {comments.map((comment) => (
                    <div key={comment.id} className='flex items-start gap-3'>
                      <Avatar className='border border-gray-100 w-8 h-8'>
                        <AvatarImage
                          src={`https://placehold.co/40x40/E0F2F7/00796B?text=${comment.author.charAt(0).toUpperCase()}`}
                          alt={comment.author}
                        />
                        <AvatarFallback className='bg-blue-50 text-blue-700 text-xs'>
                          {comment.author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 bg-gray-50 p-3 border border-gray-100 rounded-lg'>
                        <p className='font-semibold text-gray-800 text-sm'>
                          {comment.author}
                        </p>
                        <p className='mt-1 text-gray-600 text-sm'>
                          {comment.content}
                        </p>
                        <p className='mt-1 text-gray-400 text-xs'>
                          {new Date(comment.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Input */}
              <div className='flex items-center gap-2 mt-4'>
                <Input
                  type='text'
                  placeholder='Write a comment...'
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  className='flex-1 border-gray-300 focus:border-emerald-500 rounded-full focus:ring-emerald-500'
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !postingComment) {
                      handlePostComment();
                    }
                  }}
                />
                <Button
                  size='icon'
                  className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 rounded-full text-white'
                  onClick={handlePostComment}
                  disabled={postingComment}
                >
                  {postingComment ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Send className='w-4 h-4' />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
