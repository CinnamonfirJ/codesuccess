"use client";

import { useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Mock data for posts
const posts = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "/premium_photo-1726082023241-9ae4066c5286.jpeg",
      initials: "SJ",
    },
    content:
      "Just completed my first coding challenge on CodeSuccesx! The community support here is amazing. #CodeNewbie #LearningToCode",
    image: "/WhatsApp Image 2025-05-21 at 18.42.02_95109c88 (1).png",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    author: {
      name: "Daily Affirmations",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DA",
    },
    content:
      "Today's affirmation: I am capable of learning new skills and growing every day. My journey is unique, and I celebrate my progress.",
    timestamp: "4 hours ago",
    isAffirmation: true,
    audioUrl: "#",
    likes: 56,
    comments: 12,
    shares: 8,
  },
  {
    id: 3,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    content:
      "Excited to share that I've been accepted into the mentorship program! Looking forward to learning from industry professionals and growing my skills. #Mentorship #Growth",
    timestamp: "Yesterday",
    likes: 89,
    comments: 15,
    shares: 7,
  },
  {
    id: 4,
    author: {
      name: "CodeSuccesx Team",
      avatar: "/hussein-xodie-xtiGJzxb5zo-unsplash.jpg",
      initials: "CS",
    },
    content:
      "New challenge alert! 📸 Join our 30-day photography challenge starting next week. Capture themed shots, improve your skills, and stand a chance to win exciting prizes! Register now in the Challenges section.",
    image: "/ChatGPT Image May 24, 2025, 07_38_07 PM.png",
    timestamp: "2 days ago",
    likes: 132,
    comments: 28,
    shares: 45,
  },
];

const AudioAffirmation = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className='flex items-center bg-teal-50 my-3 p-4 rounded-lg'>
      <Button
        variant='outline'
        size='icon'
        className='bg-teal hover:bg-teal-600 mr-4 rounded-full w-10 h-10 text-white'
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <Pause className='w-4 h-4' />
        ) : (
          <Play className='w-4 h-4' />
        )}
      </Button>
      <div className='flex-1'>
        <div className='bg-gray-200 rounded-full h-2'>
          <div className='bg-teal rounded-full w-1/3 h-2'></div>
        </div>
        <div className='flex justify-between mt-1 text-gray-500 text-xs'>
          <span>0:45</span>
          <span>2:30</span>
        </div>
      </div>
    </div>
  );
};

export default function Feed() {
  return (
    <div className='mx-auto p-4 max-w-2xl'>
      {/* Create Post */}
      <Card className='mb-6'>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-4'>
            <Avatar>
              <AvatarImage
                src='/muhammad-taha-ibrahim-boIrez2f5hs-unsplash.jpg'
                alt='User'
              />
              <AvatarFallback className='bg-teal-100 text-teal-800'>
                JD
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors cursor-pointer'>
              <input
                type='text'
                placeholder='Share something positive...'
                className='outline-none w-full'
              />
              {/* <p className="text-gray-500">Share something positive...</p> */}
            </div>
          </div>
        </CardHeader>
        <CardFooter className='flex justify-between pt-0'>
          <Button variant='ghost' size='sm' className='text-gray-500'>
            Photo
          </Button>
          <Button variant='ghost' size='sm' className='text-gray-500'>
            Goal
          </Button>
          <Button variant='ghost' size='sm' className='text-gray-500'>
            Affirmation
          </Button>
        </CardFooter>
      </Card>

      {/* Posts Feed */}
      <div className='space-y-6'>
        {posts.map((post) => (
          <Card key={post.id} className='overflow-hidden'>
            <CardHeader className='pb-3'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                    />
                    <AvatarFallback className='bg-teal-100 text-teal-800'>
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{post.author.name}</p>
                    <p className='text-gray-500 text-xs'>{post.timestamp}</p>
                  </div>
                </div>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <MoreHorizontal className='w-5 h-5' />
                </Button>
              </div>
            </CardHeader>
            <CardContent className='pb-3'>
              <p
                className={
                  post.isAffirmation
                    ? "text-lg font-medium text-navy italic"
                    : ""
                }
              >
                {post.content}
              </p>

              {post.isAffirmation && <AudioAffirmation />}

              {post.image && (
                <div className='mt-3 rounded-lg overflow-hidden'>
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt='Post content'
                    className='w-full h-auto object-cover'
                    width={600}
                    height={400}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className='pt-0'>
              <div className='w-full'>
                <div className='flex justify-between items-center mb-2 text-gray-500 text-sm'>
                  <span>{post.likes} likes</span>
                  <span>
                    {post.comments} comments • {post.shares} shares
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between pt-2'>
                  <Button variant='ghost' size='sm' className='flex-1 gap-1'>
                    <Heart className='w-4 h-4' />
                    Like
                  </Button>
                  <Button variant='ghost' size='sm' className='flex-1 gap-1'>
                    <MessageSquare className='w-4 h-4' />
                    Comment
                  </Button>
                  <Button variant='ghost' size='sm' className='flex-1 gap-1'>
                    <Share2 className='w-4 h-4' />
                    Share
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
