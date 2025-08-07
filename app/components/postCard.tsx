"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  MoreHorizontal,
  Play,
  Pause,
  // Send,
  Bookmark,
  Loader2,
  Trash2,
  Repeat,
  Quote,
  Edit,
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
// import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import EditPostModal from "./editPostModal";
import { useUser } from "@/hooks/useUser";

type OriginalPostType = {
  id: number;
  author_full_name: string;
  author_image: string;
  body: string;
  // created_at: string;
  media?: string;
  retweet_count?: number;
};

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
  retweet_count?: string;
  parent_post_data?: OriginalPostType;
};

interface PostCardProps {
  post: PostType;
  liked_by_user: boolean;
  toggleLike: (postId: number) => Promise<void>;
  currentUserId: string | null;
  onPostDeleted: (postId: number) => void;
  onRetweeted: (postId: number) => void;
  onPostUpdated: (updatedPost: PostType) => void;
}

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
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying(!isPlaying);
        }}
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

export default function PostCard({
  post,
  liked_by_user,
  toggleLike,
  currentUserId,
  onPostDeleted,
  onRetweeted,
  onPostUpdated,
}: PostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRetweeting, setIsRetweeting] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRetweetOptions, setShowRetweetOptions] = useState(false);
  const [showQuoteRetweetDialog, setShowQuoteRetweetDialog] = useState(false);
  const [quoteRetweetText, setQuoteRetweetText] = useState("");
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const isAuthor =
    currentUserId !== null && post.author_full_name === currentUserId;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target as Node)
      ) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsMenuRef]);

  const handleDeletePost = async () => {
    setShowOptionsMenu(false);
    toast.promise(
      new Promise(async (resolve, reject) => {
        setIsDeleting(true);
        try {
          const res = await fetch(`/api/posts/${post.id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error(
              `Failed to delete post: Status ${res.status}`,
              errorData
            );
            reject(new Error(errorData.detail || "Failed to delete post."));
            return;
          }

          onPostDeleted(post.id);
          resolve("Post deleted successfully!");
        } catch (error: any) {
          console.error("Error deleting post:", error);
          reject(
            new Error(
              error.message || "Could not delete post due to a network error."
            )
          );
        } finally {
          setIsDeleting(false);
        }
      }),
      {
        loading: "Deleting post...",
        success: "Post deleted!",
        error: (err) => err.message,
      }
    );
  };

  const handleRetweet = async (
    postId: number,
    isQuote: boolean = false,
    quoteText: string = ""
  ) => {
    setIsRetweeting(true);
    setShowRetweetOptions(false);
    setShowQuoteRetweetDialog(false);

    try {
      const payload: {
        parent_post: number;
        is_retweet: boolean;
        body?: string;
        is_qoute_retweet?: boolean;
        quote_text?: string;
      } = {
        parent_post: postId,
        is_retweet: !isQuote,
      };

      if (isQuote) {
        payload.is_qoute_retweet = true;
        payload.quote_text = quoteText;
      }

      const res = await fetch(`/api/posts/${postId}/retweet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to retweet:", errorData);
        toast.error(errorData.detail || "Failed to retweet.");
        return;
      }

      toast.success("Post retweeted successfully!");
      onRetweeted(post.id);
    } catch (error) {
      console.error("Error retweeting:", error);
      toast.error("An unexpected error occurred while retweeting.");
    } finally {
      setIsRetweeting(false);
      setQuoteRetweetText("");
    }
  };

  return (
    <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-shadow duration-300'>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Link
              href={`/profile/${post.author_username}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar className='border-2 border-gray-200'>
                <AvatarImage
                  src={post.author_image || "/placeholder.svg"}
                  alt={post.author_full_name}
                />
                <AvatarFallback className='bg-gradient-to-r from-emerald-100 to-blue-100 font-bold text-emerald-800'>
                  {post.author_full_name
                    ? post.author_full_name.charAt(0).toUpperCase()
                    : "L"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                href={`/profile/${post.author_username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex items-center gap-2'>
                  <p className='font-semibold text-gray-900'>
                    {post.author_full_name}
                  </p>
                  {post.author_full_name && (
                    <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-5 h-5'>
                      <span className='text-white text-xs'>✓</span>
                    </div>
                  )}
                </div>
              </Link>
              <p className='text-gray-500 text-sm'>
                {moment(post.created_at).fromNow()}
              </p>
            </div>
          </div>
          <div className='relative' ref={optionsMenuRef}>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-gray-100 rounded-full'
              onClick={(e) => {
                e.stopPropagation();
                setShowOptionsMenu(!showOptionsMenu);
              }}
            >
              <MoreHorizontal className='w-5 h-5' />
            </Button>
            {showOptionsMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className='right-0 z-10 absolute bg-white shadow-lg mt-2 border border-gray-200 rounded-md w-40 overflow-hidden'
              >
                <Button
                  variant='ghost'
                  className='justify-start hover:bg-gray-100 px-4 py-2 w-full text-gray-700 text-sm'
                  onClick={(e) => e.stopPropagation()}
                >
                  <Bookmark className='mr-2 w-4 h-4' />
                  Bookmark
                </Button>
                {isAuthor && (
                  <>
                    <Button
                      variant='ghost'
                      className='justify-start hover:bg-blue-50 px-4 py-2 w-full text-blue-600 text-sm'
                      onClick={() => {
                        setShowOptionsMenu(false);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit className='mr-2 w-4 h-4' />
                      Edit Post
                    </Button>
                    <Button
                      variant='ghost'
                      className='justify-start hover:bg-red-50 px-4 py-2 w-full text-red-600 text-sm'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost();
                      }}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                      ) : (
                        <Trash2 className='mr-2 w-4 h-4' />
                      )}
                      Delete Post
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </CardHeader>

      <Link href={`/posts/${post.id}`} className='block'>
        <CardContent className='pb-3'>
          <p
            className={`leading-relaxed whitespace-pre-wrap ${post.isAffirmation ? "text-lg font-medium text-gray-800 italic" : "text-gray-800"}`}
          >
            {post.body}
          </p>

          {post.quote_text && (
            <p
              className={`leading-relaxed whitespace-pre-wrap ${post.isAffirmation ? "text-lg font-medium text-gray-800 italic" : "text-gray-800"}`}
            >
              {post.quote_text}
            </p>
          )}

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

          {post.parent_post_data && (
            <>
              <div className='bg-gray-50 my-2 py-2 pl-4 border-gray-200 border-l-4 rounded-md'>
                <div className='flex items-center gap-3'>
                  <Link
                    href={`/profile/${post?.parent_post_data?.author_full_name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Avatar className='border-2 border-gray-200'>
                      <AvatarImage
                        src={
                          post?.parent_post_data.author_image ||
                          "/placeholder.svg"
                        }
                        alt={post?.parent_post_data?.author_full_name}
                      />
                      <AvatarFallback className='bg-gradient-to-r from-emerald-100 to-blue-100 font-bold text-emerald-800'>
                        {post?.parent_post_data?.author_full_name
                          ? post?.parent_post_data?.author_full_name
                              .charAt(0)
                              .toUpperCase()
                          : "L"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link
                      href={`/profile/${post?.parent_post_data?.author_full_name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className='flex items-center gap-2'>
                        <p className='font-semibold text-gray-900'>
                          {post?.parent_post_data?.author_full_name}
                        </p>
                        {post?.parent_post_data?.author_full_name && (
                          <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-5 h-5'>
                            <span className='text-white text-xs'>✓</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <p className='text-gray-500 text-sm'>
                      {moment(post.created_at).fromNow()}
                    </p>
                  </div>
                </div>

                <p className='text-gray-700 italic whitespace-pre-wrap'>
                  &#34;{post.parent_post_data.body}&#34;
                </p>

                {post?.parent_post_data?.media && (
                  <motion.div
                    className='mt-4 border border-gray-200 rounded-xl overflow-hidden'
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={post?.parent_post_data.media || "/placeholder.svg"}
                      alt='Post content'
                      className='w-full h-auto object-cover'
                      width={600}
                      height={400}
                    />
                  </motion.div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Link>

      <CardFooter className='pt-0'>
        <div className='w-full'>
          <Separator className='mb-3' />
          <div className='flex justify-between'>
            <Button
              variant='ghost'
              size='sm'
              className={`flex-1 gap-2 transition-colors ${
                liked_by_user
                  ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                  : "text-gray-600 hover:text-red-500 hover:bg-red-50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(post.id);
              }}
            >
              <div className='flex items-center gap-1'>
                {post?.likes_count || "0"}
                <Heart
                  className={`w-4 h-4 ${liked_by_user ? "fill-current" : ""}`}
                />
              </div>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex-1 gap-2 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/posts/${post.id}`;
              }}
            >
              <div className='flex items-center gap-1'>
                {post?.comments_count || "0"}
                <MessageSquare className='w-4 h-4' />
              </div>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className={`flex-1 gap-2 transition-colors ${
                post?.is_retweet
                  ? "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setShowRetweetOptions(true);
              }}
              disabled={isRetweeting}
            >
              {isRetweeting ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <div className='flex items-center gap-1'>
                  {post?.retweet_count || "0"}
                  <Repeat className='w-4 h-4' />
                </div>
              )}
            </Button>
          </div>
        </div>
      </CardFooter>

      {post && (
        <EditPostModal
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          postId={post.id}
          initialBody={post.body}
          initialMediaUrl={post.media}
          onPostUpdated={onPostUpdated}
        />
      )}

      {/* Retweet Options Dialog */}
      <Dialog open={showRetweetOptions} onOpenChange={setShowRetweetOptions}>
        <DialogContent className='shadow-xl p-0 rounded-2xl sm:max-w-[300px]'>
          <div className='space-y-1 p-2'>
            <Button
              variant='ghost'
              className='justify-start gap-2 p-6 rounded-xl w-full text-lg'
              onClick={(e) => {
                e.stopPropagation();
                handleRetweet(post.id);
              }}
              disabled={isRetweeting}
            >
              <Repeat className='w-5 h-5' />
              {isRetweeting ? (
                <Loader2 className='mr-2 w-4 h-4 animate-spin' />
              ) : (
                "Retweet"
              )}
            </Button>
            <Button
              variant='ghost'
              className='justify-start gap-2 p-6 rounded-xl w-full text-lg'
              onClick={(e) => {
                e.stopPropagation();
                setShowRetweetOptions(false);
                setShowQuoteRetweetDialog(true);
              }}
            >
              <Quote className='w-5 h-5' />
              Quote Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quote Retweet Dialog */}
      <Dialog
        open={showQuoteRetweetDialog}
        onOpenChange={setShowQuoteRetweetDialog}
      >
        <DialogContent className='shadow-xl p-0 rounded-2xl sm:max-w-[600px]'>
          <DialogHeader className='flex-row justify-between items-center p-4 border-b'>
            <div className='flex items-center gap-4'>
              <DialogClose asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full w-9 h-9'
                >
                  ✖
                </Button>
              </DialogClose>
              <DialogTitle className='font-bold text-xl'>
                Quote Post
              </DialogTitle>
            </div>
            <Button
              className='px-6 rounded-full font-bold'
              onClick={(e) => {
                e.stopPropagation();
                handleRetweet(post.id, true, quoteRetweetText);
              }}
              disabled={isRetweeting || !quoteRetweetText.trim()}
            >
              {isRetweeting ? (
                <Loader2 className='mr-2 w-4 h-4 animate-spin' />
              ) : (
                "Post"
              )}
            </Button>
          </DialogHeader>
          <div className='flex flex-col gap-4 p-6'>
            <div className='flex items-start gap-4'>
              <Avatar className='w-12 h-12'>
                <AvatarImage
                  src={user?.profile?.profile_image || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {`${user.first_name[0]}${user.last_name[0]}`}
                </AvatarFallback>
              </Avatar>
              <textarea
                value={quoteRetweetText}
                onChange={(e) => setQuoteRetweetText(e.target.value)}
                placeholder='Add a comment or quote...'
                className='border-none focus:outline-none focus:ring-0 w-full placeholder:text-gray-500 text-lg resize-none'
                rows={4}
              />
            </div>
            {/* The original post card, styled to look nested */}
            <div className='p-4 border rounded-xl'>
              <div className='flex gap-2'>
                <Avatar className='w-6 h-6'>
                  <AvatarImage src={post.author_image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {post.author_full_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex items-center'>
                  <span className='font-semibold text-sm'>
                    {post.author_full_name}
                  </span>
                  <span className='ml-1 text-gray-500 text-sm'>
                    @{post.author_full_name}
                    {/* @{post.author_username} */}
                  </span>
                </div>
              </div>
              <p className='mt-2 text-gray-700 text-sm whitespace-pre-wrap'>
                {post.body}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
