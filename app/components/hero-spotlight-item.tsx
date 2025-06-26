"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Star } from "lucide-react";

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

interface HeroSpotlightItemProps {
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

export default function HeroSpotlightItem({ hero }: HeroSpotlightItemProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card className='group bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-all duration-300'>
      <div className='relative h-64 overflow-hidden'>
        {hero.imageUrl ? (
          <Image
            src={hero.imageUrl || "/placeholder.svg"}
            alt={hero.name || "Hero"}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300 w-full h-full'>
            <Star className='w-16 h-16 text-gray-400' />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
        <div className='right-4 bottom-4 left-4 absolute'>
          {hero.areaOfExcellence && (
            <Badge
              className={`${getAreaColor(hero.areaOfExcellence)} text-xs font-medium mb-2`}
            >
              {hero.areaOfExcellence}
            </Badge>
          )}
          <h3 className='font-bold text-white text-lg leading-tight'>
            {hero.name || "Unknown Hero"}
          </h3>
        </div>
      </div>

      <CardContent className='p-6'>
        <div className='space-y-4'>
          <p className='text-gray-600 text-sm leading-relaxed'>
            {hero.description
              ? truncateText(hero.description, 120)
              : "No description available."}
          </p>

          {hero.adversities && hero.adversities.length > 0 && (
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900 text-sm'>
                Key Challenges:
              </h4>
              <div className='flex flex-wrap gap-1'>
                {hero.adversities.slice(0, 2).map((adversity, index) => (
                  <Badge
                    key={index}
                    variant='outline'
                    className='bg-red-50 border-red-200 text-red-700 text-xs'
                  >
                    {truncateText(adversity, 25)}
                  </Badge>
                ))}
                {hero.adversities.length > 2 && (
                  <Badge
                    variant='outline'
                    className='bg-gray-50 text-gray-600 text-xs'
                  >
                    +{hero.adversities.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {hero._createdAt && (
            <div className='flex items-center gap-2 text-gray-500 text-xs'>
              <Calendar className='w-3 h-3' />
              <span>
                Featured {new Date(hero._createdAt).toLocaleDateString()}
              </span>
            </div>
          )}

          <Link href={`/hero-spotlight/${hero._id}`}>
            <Button className='group-hover:bg-blue-600 w-full transition-colors'>
              Read Full Story
              <ArrowRight className='ml-2 w-4 h-4' />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
