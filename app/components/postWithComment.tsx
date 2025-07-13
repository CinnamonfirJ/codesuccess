"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Heart,
  TrendingUp,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AudioAffirmation } from "./audioAffirmation";
import CommentThread from "./commentThread";

export default function PostWithComments({ post, isLiked, toggleLike }: any) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/posts/${post.id}/comments`)
        .then((res) => res.json())
        .then((data) => setComments(data));
    }
  }, [showComments, post.id]);

  return (
    <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-shadow duration-300'>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Avatar className='border-2 border-gray-200'>
              <AvatarImage
                src={post.author || "/placeholder.svg"}
                alt={post.author}
              />
              <AvatarFallback className='bg-gradient-to-r from-emerald-100 to-blue-100 font-bold text-emerald-800'>
                {post.author}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-gray-900'>{post.author}</p>
                {post.author && (
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
            {post.tags.map((tag: string, idx: number) => (
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
                {post?.likes || 0} likes
              </span>
              <span className='flex items-center gap-1'>
                <TrendingUp className='w-4 h-4' />
                Trending
              </span>
            </div>
            <span>
              {comments.length} comments • {post.shares} shares
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
              onClick={() => setShowComments(!showComments)}
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

          {showComments && (
            <div className='mt-4'>
              <CommentThread comments={comments} postId={post.id} />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
