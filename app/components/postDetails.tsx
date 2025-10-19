"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  MoreHorizontal,
  Play,
  Pause,
  Send,
  Bookmark,
  Loader2,
  Trash2,
  Repeat,
  Quote,
  ArrowLeft,
  Edit, // Import the Edit icon
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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import moment from "moment";
import {
  Dialog, // Keep Dialog for Retweet Options
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogFooter,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser"; // Assuming this hook provides user data
import EditPostModal from "./editPostModal";
import { DialogClose } from "@radix-ui/react-dialog";

// Define the types needed for the post and comments
type CommentType = {
  id: number;
  post: number;
  author: number;
  author_username: string;
  author_image: string;
  content: string;
  commented_at: string;
  parent?: number | null;
  replies?: CommentType[];
};

type OriginalPostType = {
  id: number;
  author_full_name: string;
  author_image: string;
  body: string;
  created_at: string;
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
  scheduled_at?: string; // Added for edit feature
  retweet_count?: string; // Added for edit feature
  parent_post_data?: OriginalPostType;
};

// --- Reusable Components (extracted from PostCard for this page) ---

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

interface CommentItemProps {
  comment: CommentType;
  postId: number;
  onCommentPosted: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
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

// --- Post Details Page Component ---

export default function PostDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params.postId)
    ? params.postId[0]
    : params.postId;

  // Use the useUser hook to get the current authenticated user
  const { user } = useUser();

  const [post, setPost] = useState<PostType | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  // States for retweet functionality
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRetweeting, setIsRetweeting] = useState(false);
  const [showRetweetOptions, setShowRetweetOptions] = useState(false);
  const [quoteRetweetText, setQuoteRetweetText] = useState("");
  const [likedByUser, setLikedByUser] = useState(false);

  const [showQuoteRetweetDialog, setShowQuoteRetweetDialog] = useState(false);

  // States for options menu
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  // States for Edit Post functionality (now passed to EditPostModal)
  const [showEditDialog, setShowEditDialog] = useState(false);

  const currentUserId = user ? `${user.first_name} ${user.last_name}` : null;

  // Fetch Post Details
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      setLoadingPost(true);
      setError(null);
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          credentials: "include",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Failed to fetch post");
        }
        const data: PostType = await res.json();
        setPost(data);
        setLikedByUser(data.liked_by_user || false);
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError(err.message || "Could not load post.");
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [postId]);

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
  }, [optionsMenuRef]);

  // Fetch Comments for the Post
  const fetchComments = useCallback(async () => {
    if (!postId) return;

    setLoadingComments(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data: CommentType[] = await res.json();

      const commentsMap = new Map<number, CommentType>();
      const rootComments: CommentType[] = [];

      data.forEach((comment) => {
        commentsMap.set(comment.id, { ...comment, replies: [] });
      });

      data.forEach((comment) => {
        const currentComment = commentsMap.get(comment.id);
        if (currentComment) {
          if (comment.parent && commentsMap.has(comment.parent)) {
            const parentComment = commentsMap.get(comment.parent);
            parentComment?.replies?.push(currentComment);
          } else {
            rootComments.push(currentComment); // Corrected this line
          }
        }
      });

      const sortComments = (arr: CommentType[]) => {
        return arr
          .sort(
            (a, b) =>
              new Date(b.commented_at).getTime() -
              new Date(a.commented_at).getTime()
          )
          .map((comment) => ({
            ...comment,
            replies: comment.replies ? sortComments(comment.replies) : [],
          }));
      };

      setComments(sortComments(rootComments));
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments.");
    } finally {
      setLoadingComments(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId, fetchComments]);

  const handleDeletePost = async () => {
    setShowOptionsMenu(false);
    toast.promise(
      new Promise(async (resolve, reject) => {
        setIsDeleting(true);
        try {
          const res = await fetch(`/api/posts/${postId}`, {
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

          // onPostDeleted(post.id);
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

  const handlePostComment = async () => {
    if (!newCommentContent.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    if (!postId) {
      toast.error("Post ID is missing.");
      return;
    }

    setPostingComment(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newCommentContent,
          post: parseInt(postId as string),
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to post comment");
      }

      toast.success("Comment posted successfully!");
      setNewCommentContent("");
      fetchComments(); // Re-fetch comments to show the new one
    } catch (error: any) {
      console.error("Error posting comment:", error);
      toast.error(error.message || "Failed to post comment.");
    } finally {
      setPostingComment(false);
    }
  };

  // Toggle Like function
  const toggleLike = async (postId: number) => {
    // Optimistic UI update
    setLikedByUser((prev) => !prev);
    setPost((prevPost) => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        likes_count: likedByUser
          ? (prevPost.likes_count || 0) - 1
          : (prevPost.likes_count || 0) + 1,
      };
    });

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        // Revert optimistic update if API call fails
        setLikedByUser((prev) => !prev);
        setPost((prevPost) => {
          if (!prevPost) return null;
          return {
            ...prevPost,
            likes_count: likedByUser
              ? (prevPost.likes_count || 0) + 1
              : (prevPost.likes_count || 0) - 1,
          };
        });
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to toggle like");
      }
    } catch (error: any) {
      console.error("Error toggling like:", error);
      toast.error(error.message || "Failed to toggle like.");
    }
  };

  // Handle Retweet function
  const handleRetweet = async (
    postId: number,
    isQuote: boolean = false,
    quoteText: string = ""
  ) => {
    setIsRetweeting(true);
    setShowRetweetOptions(false);
    try {
      if (!post) {
        toast.error("Original post data not available for retweet.");
        setIsRetweeting(false);
        return;
      }

      const payload: {
        parent_post: number;
        is_retweet: boolean;
        body?: string;
        is_qoute_retweet?: boolean;
        quote_text?: string;
      } = {
        parent_post: postId,
        is_retweet: false,
      };

      if (isQuote) {
        payload.body = post.body;
        payload.is_qoute_retweet = true;
        payload.quote_text = quoteText;
      } else {
        payload.body = post.body;
        payload.is_qoute_retweet = false;
      }

      const res = await fetch(`/api/posts/${postId}/retweets`, {
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
      setPost((prevPost) => {
        if (prevPost) {
          return { ...prevPost, shares: (prevPost.shares || 0) + 1 };
        }
        return prevPost;
      });
    } catch (error) {
      console.error("Error retweeting:", error);
      toast.error("An unexpected error occurred while retweeting.");
    } finally {
      setIsRetweeting(false);
      setQuoteRetweetText("");
    }
  };

  // Check if the current user is the author of the post
  const isAuthor =
    currentUserId !== null && post?.author_full_name === currentUserId;

  if (loadingPost) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='w-8 h-8 text-gray-500 animate-spin' />
        <span className='ml-2 text-gray-500'>Loading post...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-red-600'>
        <p className='font-semibold text-lg'>Error: {error}</p>
        <Button onClick={() => router.back()} className='mt-4'>
          Go Back
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-gray-600'>
        <p className='font-semibold text-lg'>Post not found.</p>
        <Button onClick={() => router.back()} className='mt-4'>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='mx-auto px-4 max-w-2xl container'>
      {/* Back Button */}
      <Button
        variant='ghost'
        className='mb-4 text-gray-600 hover:text-blue-500'
        onClick={() => router.back()}
      >
        <ArrowLeft className='mr-2 w-5 h-5' />
        Back to Feed
      </Button>

      {/* Post Card - Full Details */}
      <Card className='bg-white shadow-lg border-0 overflow-hidden'>
        <CardHeader className='pb-3'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <Link href={`/profile/${post.author_username}`}>
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
                <Link href={`/profile/${post.author_username}`}>
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
                  {moment(post.created_at).format("MMMM Do YYYY, h:mm a")}
                </p>
              </div>
            </div>
            <div className='relative' ref={optionsMenuRef}>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-gray-100 rounded-full'
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
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
                          setShowOptionsMenu(false); // Close options menu
                          setShowEditDialog(true); // Open edit dialog
                          // The EditPostModal will now handle its own state initialization from props
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

        <CardFooter className='pt-0'>
          <div className='w-full'>
            <div className='flex justify-between items-center mb-3 text-gray-500 text-sm'>
              <div className='flex items-center gap-4'>
                <span className='flex items-center gap-1'>
                  <Heart className='w-4 h-4 text-red-500' />
                  {post?.likes_count} likes
                </span>
              </div>
              <span>{post?.comments_count || "0"} comments</span>
              <span>{post?.shares || "0"} retweets</span>
            </div>
            <Separator className='mb-3' />
            <div className='flex justify-between'>
              <Button
                variant='ghost'
                size='sm'
                className={`flex-1 gap-2 transition-colors ${
                  likedByUser
                    ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                    : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                }`}
                onClick={() => toggleLike(post.id)}
              >
                <Heart
                  className={`w-4 h-4 ${likedByUser ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='flex-1 gap-2 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
                onClick={() => {
                  /* No action needed here, comments are already visible */
                }}
              >
                <MessageSquare className='w-4 h-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className={`flex-1 gap-2 transition-colors ${
                  post?.is_retweet
                    ? "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                    : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
                }`}
                onClick={() => setShowRetweetOptions(true)}
                disabled={isRetweeting}
              >
                {isRetweeting ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <Repeat className='w-4 h-4' />
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

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

        {loadingComments ? (
          <div className='flex justify-center items-center py-4'>
            <Loader2 className='w-5 h-5 text-gray-500 animate-spin' />
            <span className='ml-2 text-gray-500'>Loading comments...</span>
          </div>
        ) : comments.length === 0 ? (
          <p className='text-gray-500 text-sm text-center'>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className='space-y-4'>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={parseInt(postId as string)} // Explicitly cast postId to string
                onCommentPosted={fetchComments}
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

      {/* Edit Post Modal - using the new component */}
      {post && ( // Only render if post data is available
        <EditPostModal
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          postId={post.id}
          initialBody={post.body}
          initialMediaUrl={post.media}
          // onPostUpdated={(updatedPost) => {
          //   setPost(updatedPost); // Update the main post state with the new data
          // }}
        />
      )}
    </div>
  );
}
