"use client";

import { useEffect, useState } from "react";
import {
  // Heart,
  // MessageSquare,
  // Share2,
  // MoreHorizontal,
  // Play,
  // Pause,
  ImageIcon,
  Target,
  Sparkles,
  Send,
  // Bookmark,
  // TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import Image from "next/image";
import { motion } from "framer-motion";
import PostModal from "./postModal";
import toast from "react-hot-toast";
import PostCard from "./postCard";
import { useUser } from "@/hooks/useUser";

type PostType = {
  id: number;
  body: string;
  author: number;
  author_name: string;
  media?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  isAffirmation?: boolean;
  isLiked?: boolean;
  likes?: number;
  comments?: number;
  shares?: number;
  timestamp?: string;
};

// Mock data for posts
// const posts = [
//   {
//     id: 1,
//     author: {
//       name: "Sarah Johnson",
//       avatar: "/premium_photo-1726082023241-9ae4066c5286.jpeg",
//       initials: "SJ",
//       verified: true,
//     },
//     content:
//       "Just completed my first coding challenge on CodeSuccex! The community support here is amazing. Feeling motivated to tackle the next one! 🚀 #CodeNewbie #LearningToCode",
//     image: "/WhatsApp Image 2025-05-21 at 18.42.02_95109c88 (1).png",
//     timestamp: "2 hours ago",
//     likes: 24,
//     comments: 5,
//     shares: 2,
//     isLiked: false,
//     tags: ["coding", "achievement"],
//   },
//   {
//     id: 2,
//     author: {
//       name: "Daily Affirmations",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "DA",
//       verified: true,
//     },
//     content:
//       "Today's affirmation: I am capable of learning new skills and growing every day. My journey is unique, and I celebrate my progress. 🌟",
//     timestamp: "4 hours ago",
//     isAffirmation: true,
//     audioUrl: "#",
//     likes: 56,
//     comments: 12,
//     shares: 8,
//     isLiked: true,
//     tags: ["affirmation", "mindset"],
//   },
//   {
//     id: 3,
//     author: {
//       name: "Michael Chen",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "MC",
//       verified: false,
//     },
//     content:
//       "Excited to share that I've been accepted into the mentorship program! Looking forward to learning from industry professionals and growing my skills. This is just the beginning! 💪 #Mentorship #Growth",
//     timestamp: "Yesterday",
//     likes: 89,
//     comments: 15,
//     shares: 7,
//     isLiked: false,
//     tags: ["mentorship", "growth"],
//   },
//   {
//     id: 4,
//     author: {
//       name: "CodeSuccex Team",
//       avatar: "/hussein-xodie-xtiGJzxb5zo-unsplash.jpg",
//       initials: "CS",
//       verified: true,
//     },
//     content:
//       "New challenge alert! 📸 Join our 30-day photography challenge starting next week. Capture themed shots, improve your skills, and stand a chance to win exciting prizes! Register now in the Challenges section.",
//     image: "/ChatGPT Image May 24, 2025, 07_38_07 PM.png",
//     timestamp: "2 days ago",
//     likes: 132,
//     comments: 28,
//     shares: 45,
//     isLiked: true,
//     tags: ["challenge", "photography"],
//   },
// ];

// const AudioAffirmation = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <motion.div
//       className='flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 my-4 p-4 border border-emerald-200 rounded-xl'
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Button
//         variant='outline'
//         size='icon'
//         className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-lg mr-4 border-0 rounded-full w-12 h-12 text-white'
//         onClick={() => setIsPlaying(!isPlaying)}
//       >
//         {isPlaying ? (
//           <Pause className='w-5 h-5' />
//         ) : (
//           <Play className='w-5 h-5' />
//         )}
//       </Button>
//       <div className='flex-1'>
//         <div className='bg-gray-200 mb-2 rounded-full h-2'>
//           <motion.div
//             className='bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full h-2'
//             initial={{ width: "0%" }}
//             animate={{ width: isPlaying ? "33%" : "33%" }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>
//         <div className='flex justify-between text-gray-600 text-xs'>
//           <span>0:45</span>
//           <span className='font-medium'>Daily Affirmation</span>
//           <span>2:30</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

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
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<"post" | "affirmation">("post");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts", {
          credentials: "include",
        });
        const data = await res.json();
        setLoading(false);
        setPosts(data);
        console.log("Post data: ", data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='space-y-6 mx-auto max-w-2xl'>
      {/* Create Post */}
      <PostModal open={openModal} onOpenChange={setOpenModal} type={type} />

      <motion.div variants={fadeInUp} initial='initial' animate='animate'>
        <Card className='bg-white shadow-lg border-0 overflow-hidden'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-4'>
              <Avatar className='border-2 border-emerald-200'>
                <AvatarImage
                  src={user?.profile?.avatar || "/placeholder.svg"}
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
                <span className='text-gray-500'>
                  Share something positive...
                </span>
              </div>
            </div>
          </CardHeader>

          <CardFooter className='flex md:flex-row flex-col justify-between items-start md:items-center px-2 md:px-6 pt-0 pb-4 w-full'>
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
            <div className='mt-2 md:mt-0 w-full'>
              <Button
                size='sm'
                className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 text-white'
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

      {/* Posts Feed */}
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
                isLiked={likedPosts.has(post.id)}
                toggleLike={toggleLike}
              />
            </motion.div>
          ))}
        </motion.div>
        // <motion.div
        //   className='space-y-6'
        //   variants={staggerContainer}
        //   initial='initial'
        //   animate='animate'
        // >
        //   {posts.map((post, index) => {
        //     const isLiked = likedPosts.has(post.id);
        //     return (
        //       <motion.div key={index} variants={fadeInUp}>
        //         <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-shadow duration-300'>
        //           <CardHeader className='pb-3'>
        //             <div className='flex justify-between items-center'>
        //               <div className='flex items-center gap-3'>
        //                 <Avatar className='border-2 border-gray-200'>
        //                   <AvatarImage
        //                     src={post.author || "/placeholder.svg"}
        //                     alt={post.author}
        //                   />
        //                   <AvatarFallback className='bg-gradient-to-r from-emerald-100 to-blue-100 font-bold text-emerald-800'>
        //                     {post.author}
        //                   </AvatarFallback>
        //                 </Avatar>
        //                 <div>
        //                   <div className='flex items-center gap-2'>
        //                     <p className='font-semibold text-gray-900'>
        //                       {post.author}
        //                     </p>
        //                     {/* This indicates the author is verified */}
        //                     {post.author && (
        //                       <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-5 h-5'>
        //                         <span className='text-white text-xs'>✓</span>
        //                       </div>
        //                     )}
        //                   </div>
        //                   <p className='text-gray-500 text-sm'>
        //                     {post.timestamp}
        //                   </p>
        //                 </div>
        //               </div>
        //               <div className='flex items-center gap-2'>
        //                 <Button
        //                   variant='ghost'
        //                   size='icon'
        //                   className='hover:bg-gray-100 rounded-full'
        //                 >
        //                   <Bookmark className='w-4 h-4' />
        //                 </Button>
        //                 <Button
        //                   variant='ghost'
        //                   size='icon'
        //                   className='hover:bg-gray-100 rounded-full'
        //                 >
        //                   <MoreHorizontal className='w-5 h-5' />
        //                 </Button>
        //               </div>
        //             </div>
        //           </CardHeader>

        //           <CardContent className='pb-3'>
        //             <p
        //               className={`leading-relaxed ${post.isAffirmation ? "text-lg font-medium text-gray-800 italic" : "text-gray-800"}`}
        //             >
        //               {post.body}
        //             </p>

        //             {post.tags && (
        //               <div className='flex flex-wrap gap-2 mt-3'>
        //                 {post.tags.map((tag, idx) => (
        //                   <Badge
        //                     key={idx}
        //                     variant='outline'
        //                     className='bg-gray-50 px-2 py-1 border-gray-200 text-gray-600 text-xs'
        //                   >
        //                     #{tag}
        //                   </Badge>
        //                 ))}
        //               </div>
        //             )}

        //             {post.isAffirmation && <AudioAffirmation />}

        //             {post.media && (
        //               <motion.div
        //                 className='mt-4 border border-gray-200 rounded-xl overflow-hidden'
        //                 whileHover={{ scale: 1.02 }}
        //                 transition={{ duration: 0.2 }}
        //               >
        //                 <Image
        //                   src={post.media || "/placeholder.svg"}
        //                   alt='Post content'
        //                   className='w-full h-auto object-cover'
        //                   width={600}
        //                   height={400}
        //                 />
        //               </motion.div>
        //             )}
        //           </CardContent>

        //           <CardFooter className='pt-0'>
        //             <div className='w-full'>
        //               <div className='flex justify-between items-center mb-3 text-gray-500 text-sm'>
        //                 <div className='flex items-center gap-4'>
        //                   <span className='flex items-center gap-1'>
        //                     <Heart className='w-4 h-4 text-red-500' />
        //                     {post?.likes
        //                       ? post.likes +
        //                         (isLiked && !post.isLiked
        //                           ? 1
        //                           : isLiked || post.isLiked
        //                             ? 0
        //                             : 0)
        //                       : 0}{" "}
        //                     likes
        //                   </span>
        //                   <span className='flex items-center gap-1'>
        //                     <TrendingUp className='w-4 h-4' />
        //                     Trending
        //                   </span>
        //                 </div>
        //                 <span>
        //                   {post.comments} comments • {post.shares} shares
        //                 </span>
        //               </div>
        //               <Separator className='mb-3' />
        //               <div className='flex justify-between'>
        //                 <Button
        //                   variant='ghost'
        //                   size='sm'
        //                   className={`flex-1 gap-2 transition-colors ${
        //                     isLiked
        //                       ? "text-red-500 hover:text-red-600 hover:bg-red-50"
        //                       : "text-gray-600 hover:text-red-500 hover:bg-red-50"
        //                   }`}
        //                   onClick={() => toggleLike(post.id)}
        //                 >
        //                   <Heart
        //                     className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
        //                   />
        //                   {isLiked ? "Liked" : "Like"}
        //                 </Button>
        //                 <Button
        //                   variant='ghost'
        //                   size='sm'
        //                   className='flex-1 gap-2 hover:bg-blue-50 text-gray-600 hover:text-blue-500'
        //                 >
        //                   <MessageSquare className='w-4 h-4' />
        //                   Comment
        //                 </Button>
        //                 <Button
        //                   variant='ghost'
        //                   size='sm'
        //                   className='flex-1 gap-2 hover:bg-emerald-50 text-gray-600 hover:text-emerald-500'
        //                 >
        //                   <Share2 className='w-4 h-4' />
        //                   Share
        //                 </Button>
        //               </div>
        //             </div>
        //           </CardFooter>
        //         </Card>
        //       </motion.div>
        //     );
        //   })}
        // </motion.div>
      )}
    </div>
  );
}
