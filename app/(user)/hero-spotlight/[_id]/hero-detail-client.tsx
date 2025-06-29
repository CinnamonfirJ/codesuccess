"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Heart,
  BookOpen,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Hero {
  _id: string;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  name?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  areaOfExcellence?: string | null;
  adversities?: string[] | null;
  overcomingChallenges?: string | null;
}

interface HeroDetailClientProps {
  hero: Hero;
}

// Function to generate consistent colors for areas
function getAreaColor(area: string): string {
  const colors = [
    "bg-blue-100 text-blue-800 border-blue-200",
    "bg-green-100 text-green-800 border-green-200",
    "bg-purple-100 text-purple-800 border-purple-200",
    "bg-orange-100 text-orange-800 border-orange-200",
    "bg-pink-100 text-pink-800 border-pink-200",
    "bg-indigo-100 text-indigo-800 border-indigo-200",
    "bg-yellow-100 text-yellow-800 border-yellow-200",
    "bg-red-100 text-red-800 border-red-200",
  ];

  // Simple hash function to get consistent color for same area
  let hash = 0;
  for (let i = 0; i < area.length; i++) {
    hash = ((hash << 5) - hash + area.charCodeAt(i)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function HeroDetailClient({ hero }: HeroDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${hero.name} - Hero Spotlight`,
          text:
            hero.description || `Learn about ${hero.name}'s inspiring story`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='top-0 z-10 sticky bg-white border-b'>
        <div className='mx-auto px-4 py-4 container'>
          <div className='flex justify-between items-center'>
            <Link href='/hero-spotlight'>
              <Button variant='ghost' className='gap-2'>
                <ArrowLeft className='w-4 h-4' />
                Back to Heroes
              </Button>
            </Link>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant='ghost' size='sm' onClick={handleShare}>
                <Share2 className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto px-4 py-8 container'>
        <div className='mx-auto max-w-4xl'>
          {/* Hero Header */}
          <div className='bg-white shadow-sm mb-8 rounded-lg overflow-hidden'>
            <div className='md:flex'>
              <div className='md:w-1/3'>
                <div className='relative h-64 md:h-full'>
                  {hero.imageUrl ? (
                    <Image
                      src={hero.imageUrl || "/placeholder.svg"}
                      alt={hero.name || "Hero"}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300 w-full h-full'>
                      <span className='font-bold text-gray-500 text-4xl'>
                        {hero.name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className='p-8 md:w-2/3'>
                <div className='space-y-4'>
                  <div>
                    <h1 className='mb-2 font-bold text-gray-900 text-3xl'>
                      {hero.name || "Unknown Hero"}
                    </h1>
                    {hero.areaOfExcellence && (
                      <Badge
                        className={`${getAreaColor(hero.areaOfExcellence)} text-sm px-3 py-1`}
                      >
                        {hero.areaOfExcellence}
                      </Badge>
                    )}
                  </div>

                  <p className='text-gray-600 text-lg leading-relaxed'>
                    {hero.description || "No description available."}
                  </p>

                  {hero._createdAt && (
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                      <Calendar className='w-4 h-4' />
                      <span>
                        Featured on{" "}
                        {new Date(hero._createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='gap-8 grid md:grid-cols-2'>
            {/* Challenges Faced */}
            {hero.adversities && hero.adversities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Target className='w-5 h-5 text-red-500' />
                    Challenges Faced
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {hero.adversities.map((adversity, index) => (
                      <div key={index} className='flex items-start gap-3'>
                        <div className='flex-shrink-0 bg-red-400 mt-2 rounded-full w-2 h-2' />
                        <p className='text-gray-700'>{adversity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overcoming Challenges */}
            {hero.overcomingChallenges && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BookOpen className='w-5 h-5 text-green-500' />
                    How They Overcame
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-700 leading-relaxed'>
                    {hero.overcomingChallenges}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Call to Action */}
          <Card className='bg-gradient-to-r from-blue-50 to-indigo-50 mt-8 border-blue-200'>
            <CardContent className='p-8 text-center'>
              <h3 className='mb-4 font-bold text-gray-900 text-xl'>
                Inspired by {hero.name || "this hero"}&apos;s story?
              </h3>
              <p className='mb-6 text-gray-600'>
                Discover more amazing stories and start your own journey of
                growth and success.
              </p>
              <div className='flex sm:flex-row flex-col justify-center gap-4'>
                <Link href='/hero-spotlight'>
                  <Button className='bg-blue-600 hover:bg-blue-700'>
                    Explore More Heroes
                  </Button>
                </Link>
                <Link href='/courses'>
                  <Button variant='outline'>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
