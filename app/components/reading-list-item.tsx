// "use client"

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface BookWithCategories {
  _id: string;
  bookTitle?: string;
  name?: {
    author?: string;
    cover?: {
      asset?: {
        url?: string;
      };
    };
  };
  executiveSummary?: string;
  categories?: string[];
  linkUrl?: string; // Still include for potential external links on detail page
}

interface ReadingListItemProps {
  item: BookWithCategories;
  viewMode: "grid" | "list";
  onClick?: () => void;
}

const scaleOnHover = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
};

const getCategoryColor = (category: string) => {
  const colors = {
    mindset: "bg-purple-100 text-purple-700",
    motivation: "bg-orange-100 text-orange-700",
    "purpose-discovery": "bg-blue-100 text-blue-700",
    "financial-literacy": "bg-green-100 text-green-700",
    communication: "bg-pink-100 text-pink-700",
    confidence: "bg-indigo-100 text-indigo-700",
    "emotional-intelligence": "bg-emerald-100 text-emerald-700",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
};

export default function ReadingListItem({
  item,
  viewMode,
  onClick,
}: ReadingListItemProps) {
  const imageUrl =
    item.name?.cover?.asset?.url || "/placeholder.svg?height=300&width=200";
  const bookTitle = item.bookTitle || "Untitled Book";
  const author = item.name?.author || "Unknown Author";
  const executiveSummary = item.executiveSummary || "";
  const categories = item.categories || [];

  const detailPageLink = `/reading-list/book/${item._id}`; // Dynamic link to the detail page

  if (viewMode === "list") {
    return (
      <motion.div {...scaleOnHover}>
        <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-all duration-300'>
          <CardContent className='p-0'>
            <div className='flex lg:flex-row flex-col'>
              <div className='flex-shrink-0 lg:w-64'>
                <div className='relative w-full h-64 lg:h-full'>
                  <Image
                    src={imageUrl}
                    alt={bookTitle}
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 100vw, 256px'
                  />
                </div>
              </div>

              <div className='flex flex-col flex-1 justify-between p-6'>
                <div>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex-1'>
                      <div className='flex flex-wrap gap-2 mb-3'>
                        {categories.map((category, index) => (
                          <Badge
                            key={index}
                            className={`${getCategoryColor(category)} text-xs`}
                          >
                            {category
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                      <h3 className='mb-1 font-bold text-gray-900 text-2xl line-clamp-2'>
                        {bookTitle}
                      </h3>
                      <p className='mb-3 text-gray-700 text-sm'>By {author}</p>
                    </div>
                  </div>

                  {executiveSummary && (
                    <div className='mb-4'>
                      <p className='text-gray-600 line-clamp-3 leading-relaxed'>
                        {executiveSummary}
                      </p>
                    </div>
                  )}
                </div>

                <div className='flex justify-between items-center pt-4 border-gray-100 border-t'>
                  <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <BookOpen className='w-4 h-4' />
                    <span>Recommended read</span>
                  </div>
                  <Link href={detailPageLink} onClick={onClick}>
                    <Button className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 text-white'>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div {...scaleOnHover}>
      <Card className='bg-white shadow-lg hover:shadow-xl border-0 h-full overflow-hidden transition-all duration-300'>
        <CardContent className='flex flex-col p-0 h-full'>
          <div className='relative w-full h-64'>
            <Image
              src={imageUrl}
              alt={bookTitle}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            />
            <div className='top-3 left-3 absolute flex flex-wrap gap-1 max-w-[calc(100%-1.5rem)]'>
              {categories.slice(0, 2).map((category, index) => (
                <Badge
                  key={index}
                  className={`${getCategoryColor(category)} text-xs`}
                >
                  {category
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              ))}
              {categories.length > 2 && (
                <Badge className='bg-gray-100 text-gray-700 text-xs'>
                  +{categories.length - 2}
                </Badge>
              )}
            </div>
          </div>

          <div className='flex flex-col flex-1 p-4'>
            <h3 className='mb-1 min-h-[3.5rem] font-bold text-gray-900 text-lg line-clamp-2'>
              {bookTitle}
            </h3>
            <p className='mb-3 text-gray-700 text-sm'>By {author}</p>

            {executiveSummary && (
              <div className='mb-3'>
                <p className='text-gray-600 text-sm line-clamp-2 leading-relaxed'>
                  {executiveSummary}
                </p>
              </div>
            )}

            <div className='mt-auto'>
              <Link href={detailPageLink} onClick={onClick}>
                <Button className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 w-full text-white'>
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
