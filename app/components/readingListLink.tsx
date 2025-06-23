"use client";

import type { GetReadingListQueryResult } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ReadingListItemProps {
  item: GetReadingListQueryResult[number];
  viewMode: "grid" | "list";
  onClick?: () => void;
}

const scaleOnHover = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
};

const getCategoryColor = (category: string) => {
  const colors = {
    fiction: "bg-purple-100 text-purple-700",
    "non-fiction": "bg-blue-100 text-blue-700",
    "self help": "bg-emerald-100 text-emerald-700",
    technology: "bg-gray-100 text-gray-700",
    business: "bg-orange-100 text-orange-700",
    growth: "bg-green-100 text-green-700",
    spiritual: "bg-indigo-100 text-indigo-700",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
};

export default function ReadingListItem({
  item,
  viewMode,
  onClick,
}: ReadingListItemProps) {
  const imageUrl =
    item.image?.asset?.url || "/placeholder.svg?height=300&width=200";
  const bookTitle = item.bookTitle || "Untitled Book";
  const description = item.description || "No description available";
  const category = item.category || "uncategorized";

  if (viewMode === "list") {
    return (
      <motion.div {...scaleOnHover}>
        <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-all duration-300'>
          <CardContent className='p-0'>
            <div className='flex md:flex-row flex-col'>
              {/* Book Cover */}
              <div className='flex-shrink-0 md:w-48'>
                <div className='relative w-full h-64 md:h-full'>
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={item.alt?.current || bookTitle}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 192px'
                  />
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-col flex-1 justify-between p-6'>
                <div>
                  <div className='flex justify-between items-start mb-3'>
                    <div className='flex-1'>
                      <Badge className={`${getCategoryColor(category)} mb-2`}>
                        {category}
                      </Badge>
                      <h3 className='mb-2 font-bold text-gray-900 text-xl line-clamp-2'>
                        {bookTitle}
                      </h3>
                    </div>
                  </div>
                  <p className='mb-4 text-gray-600 line-clamp-3 leading-relaxed'>
                    {description}
                  </p>
                </div>

                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <BookOpen className='w-4 h-4' />
                    <span>Recommended read</span>
                  </div>
                  {item.linkUrl && (
                    <Link
                      href={item.linkUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={onClick}
                    >
                      <Button className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 text-white'>
                        <ExternalLink className='mr-2 w-4 h-4' />
                        Get Book
                      </Button>
                    </Link>
                  )}
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
          {/* Book Cover */}
          <div className='relative w-full h-64'>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={item.alt?.current || bookTitle}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            />
            <div className='top-3 left-3 absolute'>
              <Badge className={`${getCategoryColor(category)}`}>
                {category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className='flex flex-col flex-1 p-4'>
            <h3 className='mb-2 min-h-[3.5rem] font-bold text-gray-900 text-lg line-clamp-2'>
              {bookTitle}
            </h3>
            <p className='flex-1 mb-4 text-gray-600 text-sm line-clamp-3 leading-relaxed'>
              {description}
            </p>

            <div className='mt-auto'>
              {item.linkUrl ? (
                <Link
                  href={item.linkUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={onClick}
                >
                  <Button className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 w-full text-white'>
                    <ExternalLink className='mr-2 w-4 h-4' />
                    Get Book
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className='bg-gray-100 w-full text-gray-400 cursor-not-allowed'
                >
                  <BookOpen className='mr-2 w-4 h-4' />
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
