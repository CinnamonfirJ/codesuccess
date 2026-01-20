"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MoreHorizontal,
  Bookmark,
  Loader2,
  Trash2,
  ArrowLeft,
  Edit,
  Heart,
  MessageSquare,
  Repeat,
  Send,
  Quote,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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

import { useUser } from "@/hooks/useUser";
import { usePost } from "@/hooks/features/usePost";
import { AudioAffirmation } from "./post/AudioAffirmation";
import { CommentItem } from "./post/CommentItem";
import EditPostModal from "./editPostModal";
import { useQueryClient } from "@tanstack/react-query";

export default function PostDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params.postId)
    ? params.postId[0]
    : params.postId ?? null;

  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    post,
    isLoadingPost,
    postError,
    comments,
    isLoadingComments,
    toggleLike,
    addComment,
    isAddingComment,
    deletePost,
    isDeletingPost,
    retweet,
    isRetweeting,
  } = usePost(postId);

  const [newCommentContent, setNewCommentContent] = useState("");
  const [showRetweetOptions, setShowRetweetOptions] = useState(false);
  const [showQuoteRetweetDialog, setShowQuoteRetweetDialog] = useState(false);
  const [quoteRetweetText, setQuoteRetweetText] = useState("");

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const currentUserId = user ? `${user.first_name} ${user.last_name}` : null;
  const isAuthor =
    currentUserId !== null && post?.author_full_name === currentUserId;

  // Close options menu when clicking outside
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

  const handleDeletePost = async () => {
    setShowOptionsMenu(false);
    toast.promise(
      deletePost().then(() => {
        router.back();
      }),
      {
        loading: "Deleting post...",
        success: "Post deleted!",
        error: "Failed to delete post",
      }
    );
  };

  const handlePostComment = async () => {
    if (!newCommentContent.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    
    try {
      await addComment({ content: newCommentContent });
      setNewCommentContent("");
      toast.success("Comment posted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to post comment.");
    }
  };

  const handleRetweet = async (
    isQuote: boolean = false,
    text: string = ""
  ) => {
    if (!post) return;
    
    // Close dialogs first
    setShowRetweetOptions(false);
    setShowQuoteRetweetDialog(false);

    try {
      const payload = {
        parent_post: post.id,
        is_retweet: !isQuote,
        is_qoute_retweet: isQuote,
        quote_text: isQuote ? text : undefined,
        body: post.body,
      };

      await retweet(payload);
      toast.success("Post retweeted!");
      if (isQuote) setQuoteRetweetText("");
    } catch (error) {
      toast.error("Failed to retweet.");
    }
  };

  if (isLoadingPost) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='w-8 h-8 text-gray-500 animate-spin' />
        <span className='ml-2 text-gray-500'>Loading post...</span>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-red-600'>
        <p className='font-semibold text-lg'>
          {postError ? "Error loading post" : "Post not found"}
        </p>
        <Button onClick={() => router.back()} className='mt-4'>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='mx-auto px-4 max-w-2xl container'>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant='ghost'
          className='mb-6 pl-0 text-gray-500 hover:text-gray-900 group'
          onClick={() => router.back()}
        >
          <div className="bg-gray-100 group-hover:bg-gray-200 mr-2 p-2 rounded-full transition-colors">
            <ArrowLeft className='w-4 h-4' />
          </div>
          <span className="font-medium">Back to Feed</span>
        </Button>
      </motion.div>

      {/* Post Card - Full Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className='bg-white shadow-xl shadow-gray-100/50 border-gray-100 overflow-hidden'>
          <CardHeader className='pb-4'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-4'>
                <Link href={`/profile/${post.author}`}>
                  <Avatar className='border-2 border-emerald-100 w-12 h-12 cursor-pointer transition-transform hover:scale-105'>
                    <AvatarImage
                      src={post.author_image || "/placeholder.svg"}
                      alt={post.author_full_name}
                    />
                    <AvatarFallback className='bg-gradient-to-br from-emerald-50 to-emerald-100 font-bold text-emerald-700 text-lg'>
                      {post.author_full_name
                        ? post.author_full_name.charAt(0).toUpperCase()
                        : "L"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href={`/profile/${post.author}`} className="group">
                    <div className='flex items-center gap-2'>
                      <h3 className='group-hover:text-emerald-600 font-bold text-gray-900 text-lg transition-colors'>
                        {post.author_full_name}
                      </h3>
                      {post.author_full_name && (
                        <div className='flex justify-center items-center bg-blue-500 rounded-full w-4 h-4 text-white'>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                             <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                           </svg>
                        </div>
                      )}
                    </div>
                    <p className='font-medium text-gray-500 text-sm'>
                      @{post.author_username || post.author_full_name.toLowerCase().replace(/\s/g, '')}
                    </p>
                  </Link>
                </div>
              </div>
              
              <div className='flex items-center gap-2'>
                  <span className='text-gray-400 text-sm whitespace-nowrap'>
                    {moment(post.created_at).fromNow()}
                  </span>
                  <div className='relative' ref={optionsMenuRef}>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full'
                        onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                    >
                        <MoreHorizontal className='w-5 h-5' />
                    </Button>
                    <AnimatePresence>
                        {showOptionsMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10, x: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: -130 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className='z-20 absolute bg-white shadow-xl shadow-gray-200/50 mt-2 border border-gray-100 rounded-xl w-48 overflow-hidden origin-top-right'
                        >
                            <div className="p-1">
                                <Button
                                variant='ghost'
                                className='justify-start hover:bg-gray-50 px-3 py-2 w-full font-medium text-gray-700 text-sm'
                                >
                                <Bookmark className='mr-2 w-4 h-4 text-gray-500' />
                                Save Post
                                </Button>
                                {isAuthor && (
                                <>
                                    <div className="bg-gray-100 my-1 h-px" />
                                    <Button
                                    variant='ghost'
                                    className='justify-start hover:bg-blue-50 px-3 py-2 w-full font-medium text-blue-600 text-sm'
                                    onClick={() => {
                                        setShowOptionsMenu(false);
                                        setShowEditDialog(true);
                                    }}
                                    >
                                    <Edit className='mr-2 w-4 h-4' />
                                    Edit
                                    </Button>
                                    <Button
                                    variant='ghost'
                                    className='justify-start hover:bg-red-50 px-3 py-2 w-full font-medium text-red-600 text-sm'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePost();
                                    }}
                                    disabled={isDeletingPost}
                                    >
                                    {isDeletingPost ? (
                                        <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                                    ) : (
                                        <Trash2 className='mr-2 w-4 h-4' />
                                    )}
                                    Delete
                                    </Button>
                                </>
                                )}
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className='pb-4'>
            <div className="space-y-4">
                <p
                    className={`leading-relaxed whitespace-pre-wrap ${
                    post.isAffirmation 
                        ? "text-2xl font-serif text-emerald-800 italic text-center py-6 px-4 bg-emerald-50/50 rounded-2xl" 
                        : "text-gray-800 text-lg"
                    }`}
                >
                    {post.body}
                </p>

                {post.quote_text && (
                    <blockquote className="border-emerald-500 bg-gray-50 p-4 border-l-4 rounded-r-xl italic text-gray-700 leading-relaxed">
                    "{post.quote_text}"
                    </blockquote>
                )}

                {post.tags && (
                    <div className='flex flex-wrap gap-2 pt-2'>
                    {post.tags.map((tag, idx) => (
                        <Badge
                        key={idx}
                        variant='secondary'
                        className='bg-blue-50 hover:bg-blue-100 px-3 py-1 text-blue-600 text-sm cursor-pointer transition-colors'
                        >
                        #{tag}
                        </Badge>
                    ))}
                    </div>
                )}

                {post.isAffirmation && <AudioAffirmation />}
                
                {post.media && (
                    <motion.div
                    className='mt-4 rounded-2xl overflow-hidden'
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    >
                    {post.media_type?.startsWith("image") && (
                        <Image
                        src={post.media}
                        alt='Post media'
                        className='shadow-sm w-full h-auto object-cover'
                        width={800}
                        height={600}
                        priority
                        />
                    )}

                    {post.media_type?.startsWith("video") && (
                        <div className='flex justify-center items-center bg-black w-full h-[400px]'>
                        <video
                            controls
                            src={post.media}
                            className='bg-black w-full h-full object-contain'
                        />
                        </div>
                    )}

                    {post.media_type?.startsWith("audio") && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <audio controls src={post.media} className='w-full' />
                        </div>
                    )}
                    </motion.div>
                )}
                
                {/* Parent Post (Quoted) */}
                {post.parent_post_data && (
                    <div className='bg-white hover:bg-gray-50 mt-4 border border-gray-200 rounded-xl overflow-hidden transition-colors cursor-pointer'>
                        <div className='p-4'>
                            <div className='flex items-center gap-3 mb-2'>
                                <Avatar className='w-8 h-8'>
                                    <AvatarImage
                                    src={
                                        post?.parent_post_data.author_image ||
                                        "/placeholder.svg"
                                    }
                                    />
                                    <AvatarFallback>
                                    {post?.parent_post_data?.author_full_name?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <span className='font-semibold text-gray-900 text-sm'>
                                    {post?.parent_post_data?.author_full_name}
                                </span>
                                <span className='text-gray-500 text-xs'>
                                    • {moment(post.parent_post_data.created_at).fromNow()}
                                </span>
                            </div>

                            <p className='text-gray-800 text-sm line-clamp-3'>
                                {post.parent_post_data.body}
                            </p>
                        </div>

                        {post?.parent_post_data?.media && (
                            <div className="h-48 relative">
                                <Image
                                    src={post?.parent_post_data.media}
                                    alt='Quoted content'
                                    className='w-full h-full object-cover'
                                    fill
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
          </CardContent>

          <CardFooter className='bg-gray-50/50 p-2 sm:p-4'>
            <div className='w-full'>
              <div className='flex justify-between items-center mb-4 px-2'>
                <div className='flex items-center gap-4 text-sm'>
                  <span className='flex items-center gap-1 font-medium text-gray-600 hover:text-red-500 transition-colors cursor-pointer'>
                    <span className="bg-red-100 p-1 rounded-full">
                        <Heart className='w-3 h-3 text-red-500 fill-current' />
                    </span>
                    {post?.likes_count} likes
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                    <span className="hover:text-gray-900 transition-colors cursor-pointer">{post?.comments_count || "0"} comments</span>
                    <span className="hover:text-gray-900 transition-colors cursor-pointer">{post?.shares || "0"} retweets</span>
                </div>
              </div>
              
              <div className='grid grid-cols-3 gap-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`group flex items-center justify-center gap-2 h-10 rounded-lg transition-all ${
                    post.liked_by_user
                      ? "text-red-500 bg-red-50 hover:bg-red-100"
                      : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                  }`}
                  onClick={() => toggleLike()}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${post.liked_by_user ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">Like</span>
                </Button>
                
                <Button
                  variant='ghost'
                  size='sm'
                  className='group flex justify-center items-center gap-2 hover:bg-blue-50 rounded-lg h-10 text-gray-600 hover:text-blue-500 transition-all'
                >
                  <MessageSquare className='w-5 h-5 transition-transform group-hover:scale-110' />
                  <span className="font-medium">Comment</span>
                </Button>
                
                <Button
                  variant='ghost'
                  size='sm'
                  className={`group flex items-center justify-center gap-2 h-10 rounded-lg transition-all ${
                    post?.is_retweet
                      ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100"
                      : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
                  }`}
                  onClick={() => setShowRetweetOptions(true)}
                  disabled={isRetweeting}
                >
                  {isRetweeting ? (
                    <Loader2 className='w-5 h-5 animate-spin' />
                  ) : (
                    <Repeat className='w-5 h-5 transition-transform group-hover:scale-110' />
                  )}
                  <span className="font-medium">Repost</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Comments Section */}
      <div className='mt-8 pt-4 border-gray-200 border-t'>
        <h3 className='mb-4 font-bold text-gray-800 text-xl'>Comments</h3>
        <div className='flex items-center gap-2 mb-6'>
          <Input
            type='text'
            placeholder='Write a comment...'
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            className='flex-1 border-gray-300 focus:border-emerald-500 rounded-full focus:ring-emerald-500'
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isAddingComment) {
                handlePostComment();
              }
            }}
          />
          <Button
            size='icon'
            className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 rounded-full text-white'
            onClick={handlePostComment}
            disabled={isAddingComment}
          >
            {isAddingComment ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Send className='w-4 h-4' />
            )}
          </Button>
        </div>

        {isLoadingComments ? (
          <div className='flex justify-center items-center py-4'>
            <Loader2 className='w-5 h-5 text-gray-500 animate-spin' />
            <span className='ml-2 text-gray-500'>Loading comments...</span>
          </div>
        ) : !comments || comments.length === 0 ? (
          <p className='text-gray-500 text-sm text-center'>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className='space-y-4'>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={parseInt(postId as string)}
                onCommentPosted={() => queryClient.invalidateQueries({ queryKey: ["post", postId, "comments"] })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Retweet Options Dialog */}
      <Dialog open={showRetweetOptions} onOpenChange={setShowRetweetOptions}>
        <DialogContent className='shadow-xl p-0 rounded-2xl sm:max-w-[300px]'>
          <div className='space-y-1 p-2'>
            <Button
              variant='ghost'
              className='justify-start gap-2 p-6 rounded-xl w-full text-lg'
              onClick={(e) => {
                e.stopPropagation();
                handleRetweet(false); // Simple retweet
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
                handleRetweet(true, quoteRetweetText);
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
                  {`${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`}
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

      {/* Edit Post Modal */}
      {post && (
        <EditPostModal
          open={showEditDialog}
          onOpenChange={(isOpen) => {
              setShowEditDialog(isOpen);
              if (!isOpen) {
                  // When closing, if it was successful, we might want to invalidate queries
                  // Ideally EditPostModal takes a callback for success
                  queryClient.invalidateQueries({ queryKey: ["post", postId] });
              }
          }}
          postId={post.id}
          initialBody={post.body}
          initialMediaUrl={post.media}
        />
      )}
    </div>
  );
}
