// app/(user)/affirmations/[_id]/affirmation-detail-client.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Heart,
  Sparkles,
  MessageSquare,
  Crown,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortableText } from "next-sanity";

// Interface for Portable Text Block and Image
interface PortableTextBlock {
  _key: string;
  _type: "block";
  children: { _key: string; _type: "span"; marks: string[]; text: string }[];
  markDefs: any[];
  style: string;
}

interface PortableTextImage {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
  alt?: string;
  [key: string]: any; // Allow other properties like dimensions
}

type PortableTextContent = (PortableTextBlock | PortableTextImage)[];

interface Affirmation {
  _id: string;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  title?: string | null;
  category?: string | null;
  description?: PortableTextContent | null;
  subCategory?: string | null;
  affirmationList?: string[] | null;
  isChallenge?: boolean | null;
  challengeDay?: number | null;
  challengeTheme?: string | null;
  dailyFocusActivity?: string | null;
  reflectionQuestion?: string | null;
}

interface AffirmationDetailClientProps {
  affirmation: Affirmation;
}

// Function to generate consistent colors for categories (re-used from other component)
function getCategoryColor(category: string): string {
  const colors = [
    "bg-pink-100 text-pink-800 border-pink-200",
    "bg-purple-100 text-purple-800 border-purple-200",
    "bg-teal-100 text-teal-800 border-teal-200",
    "bg-yellow-100 text-yellow-800 border-yellow-200",
    "bg-indigo-100 text-indigo-800 border-indigo-200",
    "bg-red-100 text-red-800 border-red-200",
  ];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = ((hash << 5) - hash + category.charCodeAt(i)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function AffirmationDetailClient({
  affirmation,
}: AffirmationDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    const shareText = `An inspiring affirmation from CodeSucces: "${affirmation.title || "Untitled"}"`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Affirmation: ${affirmation.title || "Untitled"}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const portableTextComponents = {
    block: {
      h1: ({ children }: any) => (
        <h1 className='mb-4 font-bold text-3xl'>{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className='mb-3 font-semibold text-2xl'>{children}</h2>
      ),
      normal: ({ children }: any) => (
        <p className='mb-4 text-gray-700 leading-relaxed'>{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className='space-y-2 pl-5 list-disc'>{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className='space-y-2 pl-5 list-decimal'>{children}</ol>
      ),
    },
    listItem: ({ children }: any) => (
      <li className='text-gray-700'>{children}</li>
    ),
  };

  return (
    <div className='bg-purple-50 min-h-screen'>
      {/* Header */}
      <div className='top-0 z-10 sticky bg-white shadow-sm border-b'>
        <div className='mx-auto px-4 py-4 container'>
          <div className='flex justify-between items-center'>
            <Link href='/affirmations'>
              <Button variant='ghost' className='gap-2'>
                <ArrowLeft className='w-4 h-4' />
                Back to Affirmations
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

      <div className='mx-auto px-4 py-12 container'>
        <div className='mx-auto max-w-4xl'>
          {/* Main Affirmation Card */}
          <Card className='relative bg-white shadow-xl mb-12 border-none'>
            <div className='-top-6 left-1/2 absolute -translate-x-1/2'>
              {affirmation.isChallenge ? (
                <Crown className='bg-white p-2 border-4 border-yellow-300 rounded-full w-12 h-12 text-yellow-500' />
              ) : (
                <Sparkles className='bg-white p-2 border-4 border-pink-300 rounded-full w-12 h-12 text-pink-500' />
              )}
            </div>
            <CardHeader className='pt-10 text-center'>
              <div className='flex flex-wrap justify-center gap-2 mb-2'>
                {affirmation.category && (
                  <Badge
                    className={`${getCategoryColor(affirmation.category)} text-sm px-3 py-1`}
                  >
                    {affirmation.category}
                  </Badge>
                )}
                {affirmation.subCategory && (
                  <Badge
                    variant='outline'
                    className='bg-gray-50 px-3 py-1 border-gray-300 text-gray-600 text-sm'
                  >
                    {affirmation.subCategory}
                  </Badge>
                )}
                {affirmation.isChallenge && affirmation.challengeDay && (
                  <Badge className='bg-purple-600 hover:bg-purple-700 text-white'>
                    Day {affirmation.challengeDay} of{" "}
                    {affirmation.challengeTheme || "Challenge"}
                  </Badge>
                )}
              </div>
              <CardTitle className='font-bold text-gray-900 text-3xl leading-tight'>
                {affirmation.title || "Untitled Affirmation"}
              </CardTitle>
            </CardHeader>
            <CardContent className='px-8 py-4 text-center'>
              <PortableText
                value={affirmation.description || []}
                components={portableTextComponents}
              />
              {affirmation.affirmationList &&
                affirmation.affirmationList.length > 0 && (
                  <div className='mt-8 pt-6 border-t'>
                    <h3 className='mb-4 font-semibold text-purple-700 text-xl'>
                      Repeat these affirmations:
                    </h3>
                    <ul className='space-y-3'>
                      {affirmation.affirmationList.map((item, index) => (
                        <li
                          key={index}
                          className='bg-purple-50 shadow-sm p-4 rounded-lg text-purple-800'
                        >
                          <Sparkles className='inline-block mr-2 w-4 h-4 text-pink-500' />
                          <span className='font-medium text-lg italic'>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Supplemental Cards */}
          <div className='gap-8 grid md:grid-cols-2'>
            {affirmation.dailyFocusActivity && (
              <Card className='bg-teal-50 border-teal-200'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-teal-700'>
                    <Lightbulb className='w-5 h-5 text-teal-500' />
                    Daily Focus Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-700'>
                    {affirmation.dailyFocusActivity}
                  </p>
                </CardContent>
              </Card>
            )}

            {affirmation.reflectionQuestion && (
              <Card className='bg-indigo-50 border-indigo-200'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-indigo-700'>
                    <MessageSquare className='w-5 h-5 text-indigo-500' />
                    Reflection Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-700'>
                    {affirmation.reflectionQuestion}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
