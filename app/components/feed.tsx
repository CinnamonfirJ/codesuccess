"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ImageIcon, Target, Sparkles, Send, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import PostModal from "./postModal";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import PostCard from "./postCard";
import { useQueryClient } from "@tanstack/react-query";
import { usePosts } from "@/hooks/features/usePosts";
import { PostType } from "@/app/types/post";

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
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<"post" | "affirmation">("post");
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePosts();

  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  // Flatten the pages into a single array of posts
  const posts = data?.pages.flatMap((page) => page) || [];

  return (
    <div className='space-y-8 mx-auto py-8 max-w-2xl'>
      <PostModal
        open={openModal}
        onOpenChange={(isOpen) => {
            setOpenModal(isOpen);
            if (!isOpen) {
                queryClient.invalidateQueries({ queryKey: ["posts"] });
            }
        }}
        type={type}
      />

      <motion.div 
        variants={fadeInUp} 
        initial='initial' 
        animate='animate'
        className="transform transition-all duration-300 hover:scale-[1.01]"
      >
        <Card className='bg-white shadow-xl shadow-gray-100/50 border-gray-100 overflow-hidden'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Avatar className='border-2 border-emerald-100 w-12 h-12 transition-transform hover:scale-105'>
                <AvatarImage
                  src={
                    user?.profile?.profile_image ||
                    "/muhammad-taha-ibrahim-boIrez2f5hs-unsplash.jpg"
                  }
                  alt='User'
                />
                <AvatarFallback className='bg-emerald-100 font-bold text-emerald-800'>
                  {user?.first_name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div
                onClick={() => {
                  setType("post");
                  setOpenModal(true);
                }}
                className='flex-1 bg-gray-50 hover:bg-gray-100/80 px-6 py-3 border border-gray-200 focus-within:border-emerald-500 rounded-full transition-all cursor-pointer group'
              >
                <span className='text-gray-500 group-hover:text-gray-700 truncate transition-colors'>
                  Share something positive...
                </span>
              </div>
            </div>
          </CardHeader>

          <CardFooter className='flex sm:flex-row flex-col justify-between items-center px-4 md:px-6 pt-0 pb-4 w-full'>
            <div className='flex justify-between gap-4 w-full sm:w-auto'>
              <Button
                variant='ghost'
                size='sm'
                className='flex-1 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600'
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
                className='flex-1 hover:bg-blue-50 text-gray-600 hover:text-blue-600'
                disabled
              >
                <Target className='mr-2 w-4 h-4' />
                Goal
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='flex-1 hover:bg-purple-50 text-gray-600 hover:text-purple-600'
                onClick={() => {
                  toast("Affirmations coming soon 🌟", { icon: "✨" });
                }}
              >
                <Sparkles className='mr-2 w-4 h-4' />
                Affirmation
              </Button>
            </div>
            <div className='mt-4 sm:mt-0 w-full sm:w-auto'>
              <Button
                size='sm'
                className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-md hover:shadow-lg w-full sm:w-auto text-white transition-all transform hover:-translate-y-0.5'
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

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12">
            <Loader2 className='mb-4 w-10 h-10 text-emerald-500 animate-spin' />
            <span className='font-medium text-gray-500'>Loading your positive feed...</span>
        </div>
      ) : isError ? (
          <div className="bg-red-50 p-6 rounded-xl text-center text-red-500">
              <p className="font-semibold">Unable to load posts.</p>
              <Button variant="outline" onClick={() => window.location.reload()} className="mt-2 text-red-600 border-red-200">
                  Try Again
              </Button>
          </div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center">
            <div className="bg-gray-100 mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                <Send className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">No posts yet</h3>
            <p className='text-gray-500'>Be the first to share something amazing!</p>
        </div>
      ) : (
        <motion.div
          className='space-y-8'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          {posts.map((post: PostType) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <PostCard post={post} />
            </motion.div>
          ))}
          
          {/* Intersection Observer Sentinel */}
          <div ref={observerTarget} className="flex justify-center py-8">
            {isFetchingNextPage && (
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            )}
            {!hasNextPage && posts.length > 0 && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className="w-12 h-px bg-gray-200"></div>
                  <span>You're all caught up!</span>
                  <div className="w-12 h-px bg-gray-200"></div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
