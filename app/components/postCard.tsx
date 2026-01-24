"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  MoreHorizontal,
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
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import EditPostModal from "./editPostModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { PostType } from "@/app/types/post";
import { AudioAffirmation } from "./post/AudioAffirmation";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface PostCardProps {
  post: PostType;
  // Core actions passed from parent (Feed/PostDetails) or handled internally
  // If undefined, component will try to handle logic itself or disable features
}

// Post type color configurations
const POST_TYPE_STYLES: Record<
  string,
  { gradient: string; text: string; bgColor: string }
> = {
  "Advertise your Biz": {
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    text: "text-purple-700",
    bgColor: "bg-purple-50",
  },
  "Share a new goal": {
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    text: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  "Share your Journey": {
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    text: "text-green-700",
    bgColor: "bg-green-50",
  },
  "Share your determination": {
    gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    text: "text-red-700",
    bgColor: "bg-red-50",
  },
  "Share something encouraging": {
    gradient: "bg-gradient-to-r from-yellow-400 to-amber-500",
    text: "text-yellow-700",
    bgColor: "bg-yellow-50",
  },
  "Share your Joy": {
    gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
    text: "text-pink-700",
    bgColor: "bg-pink-50",
  },
  "Nominate a hero": {
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    text: "text-indigo-700",
    bgColor: "bg-indigo-50",
  },
};

export default function PostCard({ post }: PostCardProps) {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRetweetOptions, setShowRetweetOptions] = useState(false);
  const [showQuoteRetweetDialog, setShowQuoteRetweetDialog] = useState(false);
  const [quoteRetweetText, setQuoteRetweetText] = useState("");
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  const currentUserId = user ? `${user.first_name} ${user.last_name}` : null; // simplified check
  const isAuthor =
    currentUserId !== null && post?.author_full_name === currentUserId;

  // Optimistic UI state
  const [isLiked, setIsLiked] = useState(post.liked_by_user);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isRetweeted, setIsRetweeted] = useState(post.is_retweet); // This might be retweeted_by_user
  const [retweetCount, setRetweetCount] = useState(
    parseInt(post.retweet_count || "0")
  );

  useEffect(() => {
      setIsLiked(post.liked_by_user);
      setLikesCount(post.likes_count || 0);
  }, [post.liked_by_user, post.likes_count]);

  const postTypeStyle = post.postType ? POST_TYPE_STYLES[post.postType] : null;

  // Handle outside click for options menu
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
  }, []);

  // --- Mutations ---

  const likeMutation = useMutation({
    mutationFn: async () => {
      // Toggle
      const endpoint = isLiked
        ? `/api/posts/${post.id}/unlike`
        : `/api/posts/${post.id}/like`;
      await axios.post(endpoint);
    },
    onMutate: async () => {
      // Optimistic update
      const previousLiked = isLiked;
      const previousCount = likesCount;
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      return { previousLiked, previousCount };
    },
    onError: (err, newTodo, context) => {
      // Rollback
      if (context) {
        setIsLiked(context.previousLiked);
        setLikesCount(context.previousCount);
      }
      toast.error("Failed to update like.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
        await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
        toast.success("Post deleted!");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: any) => {
        toast.error(err.message || "Failed to delete post");
    }
  });

  const retweetMutation = useMutation({
      mutationFn: async (payload: { is_retweet: boolean, is_qoute_retweet?: boolean, quote_text?: string, parent_post: number }) => {
          await axios.post(`/api/posts/${post.id}/retweet`, payload);
      },
      onSuccess: () => {
          toast.success("Retweeted!");
          setShowRetweetOptions(false);
          setShowQuoteRetweetDialog(false);
          setQuoteRetweetText("");
          queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (err: any) => {
          toast.error(err.message || "Failed to retweet");
      }
  })

  return (
    <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-shadow duration-300'>
      {/* Post Type Banner */}
      {postTypeStyle && (
        <div
          className={`${postTypeStyle.gradient} px-4 py-2 flex items-center justify-between`}
        >
          <span className='font-semibold text-white text-sm tracking-wide'>
            {post.postType}
          </span>
          <div className='bg-white bg-opacity-20 px-3 py-1 rounded-full'>
            <span className='font-medium text-white text-xs'>Featured</span>
          </div>
        </div>
      )}

      <CardHeader className='pb-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Link
              href={`/profile/${post.author_username || post.author}`}
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
                href={`/profile/${post.author_username || post.author}`}
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
            <AnimatePresence>
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
                            deleteMutation.mutate();
                            setShowOptionsMenu(false);
                        }}
                        disabled={deleteMutation.isPending}
                        >
                        {deleteMutation.isPending ? (
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
            </AnimatePresence>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className='pb-3 cursor-pointer'
        onClick={() => router.push(`/posts/${post.id}`)}
      >
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
            onClick={(e) => e.stopPropagation()} // don't navigate when clicking media
          >
            {post.media_type?.startsWith("image") && (
              <Image
                src={post.media}
                alt='Post media'
                className='w-full h-auto object-cover'
                width={600}
                height={400}
              />
            )}

            {post.media_type?.startsWith("video") && (
              <div className='flex justify-center items-center bg-black w-full h-64'>
                <video
                  controls
                  src={post.media}
                  className='bg-black w-full h-64 object-cover'
                />
              </div>
            )}

            {post.media_type?.startsWith("audio") && (
              <audio controls src={post.media} className='w-full' />
            )}
          </motion.div>
        )}

        {/* Parent Post (Quoted or Retweeted content context) */}
        {post.parent_post_data && (
          <div className='bg-gray-50 my-2 py-2 pl-4 border-gray-200 border-l-4 rounded-md'>
            <div className='flex items-center gap-3'>
              <Link
                href={`/profile/${post?.parent_post_data?.author_username || post?.parent_post_data?.author}`}
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
                  href={`/profile/${post?.parent_post_data?.author_username || post?.parent_post_data?.author}`}
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
                onClick={(e) => e.stopPropagation()}
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
        )}
      </CardContent>

      <CardFooter className='pt-0'>
        <div className='w-full'>
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
              onClick={(e) => {
                e.stopPropagation();
                likeMutation.mutate();
              }}
              disabled={likeMutation.isPending}
            >
              <div className='flex items-center gap-1'>
                {likesCount}
                <Heart
                  className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                />
              </div>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex-1 gap-2 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/posts/${post.id}`);
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
                post.is_retweet // Note: server naming might need unifying, using prop for now
                  ? "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setShowRetweetOptions(true);
              }}
              disabled={retweetMutation.isPending}
            >
              {retweetMutation.isPending ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <div className='flex items-center gap-1'>
                  {post?.retweet_count || "0"}
                  <Repeat
                    className={`w-4 h-4 ${post.is_retweet ? "fill-current text-emerald-500" : ""} `}
                  />
                </div>
              )}
            </Button>
          </div>
        </div>
      </CardFooter>

      {post && (
        <EditPostModal
          open={showEditDialog}
          onOpenChange={(open) => {
              setShowEditDialog(open);
              if(!open) {
                queryClient.invalidateQueries({ queryKey: ["posts"] });
              }
          }}
          postId={post.id}
          initialBody={post.body}
          initialMediaUrl={post.media}
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
                retweetMutation.mutate({ is_retweet: true, parent_post: post.id });
              }}
              disabled={retweetMutation.isPending}
            >
              <Repeat className='w-5 h-5' />
              {retweetMutation.isPending ? (
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
                retweetMutation.mutate({ 
                    parent_post: post.id,
                    is_retweet: false, 
                    is_qoute_retweet: true,
                    quote_text: quoteRetweetText 
                });
              }}
              disabled={retweetMutation.isPending || !quoteRetweetText.trim()}
            >
              {retweetMutation.isPending ? (
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
                  {user && `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`}
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
                    {post.author_full_name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className='flex items-center'>
                  <span className='font-semibold text-sm'>
                    {post.author_full_name}
                  </span>
                  <span className='ml-1 text-gray-500 text-sm'>
                    @{post.author_full_name}
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
