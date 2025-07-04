// app/components/hero-spotlight-item.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
// Import the PortableTextRenderer here if you want to use it for a more complex preview
// import { PortableTextRenderer } from "@/app/components/PortableTextRenderer";

// Ensure these PortableText types are consistent and available in this file
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

// Updated Hero Interface for HeroSpotlightItem
interface Hero {
  _id: string;
  name?: string | null;
  imageUrl?: string | null;
  description?: PortableTextContent | null;
  excellenceSection?: {
    areaOfExcellence?: string[] | null;
    descriptionOfExcellence?: PortableTextContent | null;
  } | null;
  // Add other fields from your Hero interface if HeroSpotlightItem uses them
}

interface HeroSpotlightItemProps {
  hero: Hero;
}

// Function to generate consistent colors for areas (copy this from HeroDetailClient.tsx)
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

  let hash = 0;
  for (let i = 0; i < area.length; i++) {
    hash = ((hash << 5) - hash + area.charCodeAt(i)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
}

// Helper to get first paragraph of Portable Text for summary or preview
const getFirstParagraphText = (blocks: PortableTextContent | null): string => {
  if (!blocks || blocks.length === 0) return "";
  const firstBlock = blocks.find(
    (block) => block._type === "block"
  ) as PortableTextBlock;
  return firstBlock
    ? firstBlock.children.map((span) => span.text).join("")
    : "";
};

export default function HeroSpotlightCard({ hero }: HeroSpotlightItemProps) {
  const descriptionPreview = getFirstParagraphText(hero.description || null);

  return (
    <div className='group flex flex-col bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300'>
      {/* Hero Image Section */}
      <Link
        href={`/hero-spotlight/${hero._id}`}
        className='block relative w-full h-64 overflow-hidden'
      >
        {hero.imageUrl ? (
          <Image
            src={hero.imageUrl}
            alt={hero.name || "Hero"}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        ) : (
          <div className='flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300 w-full h-full'>
            <span className='font-bold text-gray-500 text-4xl'>
              {hero.name?.charAt(0) || "?"}
            </span>
          </div>
        )}
        <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4'>
          <h3 className='drop-shadow-md font-bold text-white text-2xl'>
            {hero.name || "Unknown Hero"}
          </h3>
        </div>
      </Link>

      {/* Content Section */}
      <div className='flex flex-col flex-grow p-6'>
        {/* Areas of Excellence Badges */}
        {hero.excellenceSection?.areaOfExcellence &&
          hero.excellenceSection.areaOfExcellence.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {hero.excellenceSection.areaOfExcellence.map((area, index) => (
                <Badge
                  key={index}
                  className={`${getAreaColor(area)} text-sm px-3 py-1`}
                >
                  {area}
                </Badge>
              ))}
            </div>
          )}

        {/* Description Preview */}
        <p className='flex-grow mb-4 text-gray-700 text-base leading-relaxed'>
          {descriptionPreview.substring(0, 150)}
          {descriptionPreview.length > 150 ? "..." : ""}
        </p>

        {/* Learn More Button */}
        <Link href={`/hero-spotlight/${hero._id}`} className='mt-auto'>
          <Button className='bg-blue-600 hover:bg-blue-700 w-full'>
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
