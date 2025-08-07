"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Target, Sparkles, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import PostModal from "./postModal";
import toast from "react-hot-toast";
import moment from "moment";
import { useUser } from "@/hooks/useUser"; // Assuming this hook provides user data
import PostCard from "./postCard";

type PostType = {
  id: number;
  body: string;
  author: number; // Assuming this is the author's ID
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
  comments_count?: number; // Ensure comments_count is present
  shares?: number;
  timestamp?: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Feed() {
  const { user } = useUser(); // Get user data from your hook
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<"post" | "affirmation">("post");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostTrigger, setNewPostTrigger] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      console.log("Fetched posts:", data);

      const formattedPosts = data
        .map((post: any) => {
          if (typeof post.id !== "number" || isNaN(post.id)) {
            console.error("Post data missing or invalid 'id':", post);
            return null;
          }
          return {
            ...post,
            author: post.author, // Ensure author ID is passed
            author_username: post.author_username || "Unknown",
            author_full_name: post.author_full_name || "Unknown User",
            author_image: post.author_image || "/placeholder.svg",
            liked_by_user: post.liked_by_user || false,
            likes_count: post.likes_count || 0,
            comments_count: post.comments_count || 0,
            timestamp: moment(post.created_at).fromNow(),
          };
        })
        .filter(Boolean);

      setPosts(formattedPosts);
    } catch (err) {
      console.error("Failed to load posts", err);
      toast.error("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [newPostTrigger]);

  const toggleLike = async (postId: number) => {
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
      console.warn(
        `Attempted to toggle like for non-existent post ID: ${postId}`
      );
      return;
    }

    const currentPost = posts[postIndex];
    const isCurrentlyLiked = currentPost.liked_by_user;

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = {
      ...currentPost,
      liked_by_user: !isCurrentlyLiked,
      likes_count: isCurrentlyLiked
        ? (currentPost.likes_count || 0) - 1
        : (currentPost.likes_count || 0) + 1,
    };
    setPosts(updatedPosts);

    const apiUrl = isCurrentlyLiked
      ? `/api/posts/${postId}/unlike`
      : `/api/posts/${postId}/like`;

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          `API call failed for ${apiUrl}: Status ${res.status}`,
          errorData
        );
        toast.error(
          errorData.detail || "Failed to update like status. Please try again."
        );
        setPosts(posts);
        return;
      }
    } catch (error: any) {
      console.error(
        `Network or unexpected error while toggling like for post ${postId}:`,
        error
      );
      toast.error(
        error.message || "Could not update like status due to a network error."
      );
      setPosts(posts);
    }
  };

  // New function to handle post deletion from PostCard
  const handlePostDeleted = (deletedPostId: number) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
    toast.success("Post deleted successfully!");
  };

  const handlePostUpdated = (updatedPost: PostType) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  // New function to handle post retweet from PostCard
  const handlePostRetweet = () => {
    setNewPostTrigger((prev) => prev + 1); // Will trigger useEffect to re-fetch
  };

  return (
    <div className='space-y-6 mx-auto max-w-2xl'>
      <PostModal
        open={openModal}
        onOpenChange={setOpenModal}
        type={type}
        onPostCreated={() => setNewPostTrigger((prev) => prev + 1)}
      />

      <motion.div variants={fadeInUp} initial='initial' animate='animate'>
        <Card className='bg-white shadow-lg border-0 overflow-hidden'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <Avatar className='border-2 border-emerald-200'>
                <AvatarImage
                  src={
                    user?.profile?.profile_image ||
                    "/muhammad-taha-ibrahim-boIrez2f5hs-unsplash.jpg"
                  }
                  alt='User'
                />
                <AvatarFallback className='bg-emerald-100 font-bold text-emerald-800'>
                  JD
                </AvatarFallback>
              </Avatar>
              <div
                onClick={() => {
                  setType("post");
                  setOpenModal(true);
                }}
                className='flex-1 bg-gradient-to-r from-gray-50 hover:from-gray-100 to-gray-100 hover:to-gray-200 px-6 py-3 border border-gray-200 rounded-full transition-all cursor-pointer'
              >
                <span className='text-gray-500 truncate'>
                  Share something positive...
                </span>
              </div>
            </div>
          </CardHeader>

          <CardFooter className='flex sm:flex-row flex-col justify-between items-center px-2 md:px-6 pt-0 pb-4 w-full'>
            <div className='flex justify-between px-2 md:px-6'>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-emerald-50 text-gray-600 hover:text-emerald-600'
                onClick={() => {
                  setType("post");
                  setOpenModal(true);
                }}
              >
                <ImageIcon className='mr-2 w-4 h-4' />
                Photo
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-blue-50 text-gray-600 hover:text-blue-600'
                disabled
              >
                <Target className='mr-2 w-4 h-4' />
                Goal
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-purple-50 text-gray-600 hover:text-purple-600'
                onClick={() => {
                  toast("Affirmations coming soon 🌟", { icon: "✨" });
                }}
              >
                <Sparkles className='mr-2 w-4 h-4' />
                Affirmation
              </Button>
            </div>
            <div className='mt-2 md:mt-0 max-sm:w-full'>
              <Button
                size='sm'
                className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 max-sm:w-full text-white'
                onClick={() => {
                  setType("post");
                  setOpenModal(true);
                }}
              >
                <Send className='mr-2 w-4 h-4' />
                Post
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {loading ? (
        <p className='text-gray-500 text-center'>Loading feed...</p>
      ) : posts.length === 0 ? (
        <p className='text-gray-500 text-center'>No posts yet. Be the first!</p>
      ) : (
        <motion.div
          className='space-y-6'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <PostCard
                post={post}
                liked_by_user={post.liked_by_user || false}
                toggleLike={toggleLike}
                currentUserId={`${user?.first_name} ${user?.last_name}` || null}
                onPostDeleted={handlePostDeleted} // Pass deletion callback
                onRetweeted={handlePostRetweet}
                onPostUpdated={handlePostUpdated}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
