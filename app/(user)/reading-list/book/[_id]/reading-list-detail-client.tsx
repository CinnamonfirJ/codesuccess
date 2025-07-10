"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Heart,
  Lightbulb,
  Target,
  CheckCircle,
  Megaphone,
  BookOpen,
  ExternalLink, // For Final Word
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Interface for the detailed book data
interface ReadingListItem {
  _id: string;
  _createdAt?: string | null;
  bookTitle?: string | null;
  name?: {
    author?: string | null;
    cover?: {
      asset?: {
        url?: string | null;
      };
    };
  };
  executiveSummary?: string | null;
  coreConceptsSection?: {
    coreConcepts?: string[] | null;
    mainPoints?: any[] | null; // Portable Text
  };
  whyReadSection?: {
    whyReadThis?: any[] | null; // Portable Text
    whyMustRead?: any[] | null; // Portable Text
    finalWord?: any[] | null; // Portable Text
  };
  linkUrl?: string | null;
  categories?: string[] | null;
}

interface ReadingListDetailClientProps {
  item: ReadingListItem;
}

// Function to generate consistent colors for categories
const getCategoryColor = (category: string) => {
  const colors = {
    mindset: "bg-purple-100 text-purple-700 border-purple-200",
    motivation: "bg-orange-100 text-orange-700 border-orange-200",
    "purpose-discovery": "bg-blue-100 text-blue-700 border-blue-200",
    "financial-literacy": "bg-green-100 text-green-700 border-green-200",
    communication: "bg-pink-100 text-pink-700 border-pink-200",
    confidence: "bg-indigo-100 text-indigo-700 border-indigo-200",
    "emotional-intelligence":
      "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    colors[category as keyof typeof colors] ||
    "bg-gray-100 text-gray-700 border-gray-200"
  );
};

// Helper to render Sanity's Portable Text blocks
const PortableTextRenderer = ({ blocks }: { blocks: any[] | null }) => {
  if (!blocks || blocks.length === 0)
    return <p className='text-gray-600'>No content available.</p>;

  return (
    <div className='space-y-4 text-gray-700 leading-relaxed'>
      {blocks.map((block, index) => {
        if (block._type === "block") {
          return (
            <p key={index}>
              {block.children.map((child: any) => child.text).join("")}
            </p>
          );
        } else if (block._type === "image" && block.asset?.url) {
          return (
            <div key={index} className='my-4 rounded-md overflow-hidden'>
              <Image
                src={block.asset.url}
                alt={block.alt || "Content image"}
                width={700} // Adjust based on your design needs
                height={400} // Adjust based on your design needs
                layout='responsive'
                objectFit='contain' // Use 'contain' to ensure the image fits within the bounds without cropping
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default function ReadingListDetailClient({
  item,
}: ReadingListDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);

  const imageUrl =
    item.name?.cover?.asset?.url || "/placeholder.svg?height=300&width=200";
  const bookTitle = item.bookTitle || "Untitled Book";
  const author = item.name?.author || "Unknown Author";
  const executiveSummary = item.executiveSummary || "";
  const coreConcepts = item.coreConceptsSection?.coreConcepts || [];
  const mainPoints = item.coreConceptsSection?.mainPoints || [];
  const whyReadThis = item.whyReadSection?.whyReadThis || [];
  const whyMustRead = item.whyReadSection?.whyMustRead || [];
  const finalWord = item.whyReadSection?.finalWord || [];
  const categories = item.categories || [];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${bookTitle} by ${author}`,
          text: executiveSummary || `Learn more about ${bookTitle}.`,
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

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='top-0 z-10 sticky bg-white border-b'>
        <div className='mx-auto px-4 py-4 container'>
          <div className='flex justify-between items-center'>
            <Link href='/reading-list'>
              <Button variant='ghost' className='gap-2'>
                <ArrowLeft className='w-4 h-4' />
                Back to Reading List
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
          <div className='bg-white shadow-sm mb-8 rounded-lg overflow-hidden'>
            <div className='md:flex'>
              <div className='md:w-1/3'>
                <div className='relative h-64 md:h-full'>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={bookTitle}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300 w-full h-full'>
                      <span className='font-bold text-gray-500 text-4xl'>
                        {bookTitle.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className='p-8 md:w-2/3'>
                <div className='space-y-4'>
                  <div>
                    <h1 className='mb-2 font-bold text-gray-900 text-3xl'>
                      {bookTitle}
                    </h1>
                    <p className='mb-2 text-gray-700 text-lg'>By {author}</p>
                    <div className='flex flex-wrap gap-2'>
                      {categories.map((category, index) => (
                        <Badge
                          key={index}
                          className={`${getCategoryColor(category)} text-sm px-3 py-1`}
                        >
                          {category
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {executiveSummary && (
                    <p className='text-gray-600 text-lg leading-relaxed'>
                      {executiveSummary}
                    </p>
                  )}

                  {item._createdAt && (
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                      <Calendar className='w-4 h-4' />
                      <span>
                        Added on{" "}
                        {new Date(item._createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='gap-8 grid md:grid-cols-1'>
            {coreConcepts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Lightbulb className='w-5 h-5 text-yellow-500' />
                    Core Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 pl-5 text-gray-700 list-disc'>
                    {coreConcepts.map((concept, index) => (
                      <li key={index}>{concept}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {mainPoints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Target className='w-5 h-5 text-purple-500' />
                    Main Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PortableTextRenderer blocks={mainPoints} />
                </CardContent>
              </Card>
            )}

            {whyReadThis.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CheckCircle className='w-5 h-5 text-green-500' />
                    Why Read This Book
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PortableTextRenderer blocks={whyReadThis} />
                </CardContent>
              </Card>
            )}

            {whyMustRead.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BookOpen className='w-5 h-5 text-blue-500' />
                    Here&apos;s Why It&apos;s a Must-Read
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PortableTextRenderer blocks={whyMustRead} />
                </CardContent>
              </Card>
            )}

            {finalWord.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Megaphone className='w-5 h-5 text-red-500' />
                    Final Word
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PortableTextRenderer blocks={finalWord} />
                </CardContent>
              </Card>
            )}
          </div>

          {item.linkUrl && (
            <Card className='bg-gradient-to-r from-emerald-50 to-teal-50 mt-8 border-emerald-200'>
              <CardContent className='p-8 text-center'>
                <h3 className='mb-4 font-bold text-gray-900 text-xl'>
                  Ready to dive into &#34;{bookTitle}&#34;?
                </h3>
                <p className='mb-6 text-gray-600'>
                  Click the button below to get your copy and start reading!
                </p>
                <Link
                  href={item.linkUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button className='bg-gradient-to-r from-emerald-600 hover:from-emerald-700 to-blue-600 hover:to-blue-700 text-white'>
                    <ExternalLink className='mr-2 w-4 h-4' />
                    Get Your Copy Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Card className='bg-gradient-to-r from-blue-50 to-indigo-50 mt-8 border-blue-200'>
            <CardContent className='p-8 text-center'>
              <h3 className='mb-4 font-bold text-gray-900 text-xl'>
                Looking for more inspiring reads?
              </h3>
              <p className='mb-6 text-gray-600'>
                Explore our full collection and discover your next favorite
                book.
              </p>
              <div className='flex sm:flex-row flex-col justify-center gap-4'>
                <Link href='/reading-list'>
                  <Button className='bg-blue-600 hover:bg-blue-700'>
                    Explore More Books
                  </Button>
                </Link>
                <Link href='/'>
                  <Button variant='outline'>Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
