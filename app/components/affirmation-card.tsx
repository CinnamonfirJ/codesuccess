"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Crown } from "lucide-react";

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
  [key: string]: any;
}

type PortableTextContent = (PortableTextBlock | PortableTextImage)[];

interface Affirmation {
  _id: string;
  title?: string | null;
  category?: string | null;
  description?: PortableTextContent | null;
  subCategory?: string | null;
  isChallenge?: boolean | null;
  challengeDay?: number | null;
  challengeTheme?: string | null;
}

interface AffirmationSpotlightCardProps {
  affirmation: Affirmation;
}

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

const getFirstParagraphText = (blocks: PortableTextContent | null): string => {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const firstBlock = blocks.find(
    (block) => block._type === "block"
  ) as PortableTextBlock;
  return firstBlock
    ? firstBlock.children.map((span) => span.text).join("")
    : "";
};

export default function AffirmationCard({
  affirmation,
}: AffirmationSpotlightCardProps) {
  const descriptionPreview = getFirstParagraphText(
    affirmation.description || null
  );

  return (
    <div className='group flex flex-col bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300'>
      <Link
        href={`/affirmations/${affirmation._id}`}
        className='block relative w-full h-48 overflow-hidden'
      >
        <div className='flex justify-center items-center bg-gradient-to-br from-purple-100 to-pink-100 w-full h-full'>
          {affirmation.isChallenge && affirmation.challengeDay ? (
            <div className='flex flex-col justify-center items-center text-purple-700'>
              <Crown className='mb-2 w-12 h-12' />
              <span className='font-bold text-3xl'>
                Day {affirmation.challengeDay}
              </span>
              <span className='mt-1 text-sm'>
                {affirmation.challengeTheme || "Challenge"}
              </span>
            </div>
          ) : (
            <Sparkles className='opacity-70 w-24 h-24 text-pink-400' />
          )}
        </div>
        <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4'>
          <h3 className='drop-shadow-md font-bold text-white text-xl'>
            {affirmation.title || "Untitled Affirmation"}
          </h3>
        </div>
      </Link>

      <div className='flex flex-col flex-grow p-6'>
        {affirmation.category && (
          <div className='flex flex-wrap gap-2 mb-4'>
            <Badge
              className={`${getCategoryColor(
                affirmation.category
              )} text-sm px-3 py-1`}
            >
              {affirmation.category}
            </Badge>
            {affirmation.subCategory && (
              <Badge
                variant='outline'
                className='bg-gray-50 px-3 py-1 border-gray-300 text-gray-600 text-sm'
              >
                {affirmation.subCategory}
              </Badge>
            )}
          </div>
        )}

        <p className='flex-grow mb-4 text-gray-700 text-base leading-relaxed'>
          {descriptionPreview.substring(0, 120)}
          {descriptionPreview.length > 120 ? "..." : ""}
        </p>

        <Link href={`/affirmations/${affirmation._id}`} className='mt-auto'>
          <Button className='bg-pink-600 hover:bg-pink-700 w-full'>
            Read Affirmation
          </Button>
        </Link>
      </div>
    </div>
  );
}
