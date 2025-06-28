// "use client"

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// Define the book type with new fields
interface BookWithCategories {
  _id: string;
  bookTitle?: string;
  description?: string;
  executiveSummary?: string;
  coreConcepts?: string[];
  whyReadThis?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  alt?: {
    current?: string;
  };
  linkUrl?: string;
  categories?: string[];
  _createdAt?: string;
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
    item.image?.asset?.url || "/placeholder.svg?height=300&width=200";
  const bookTitle = item.bookTitle || "Untitled Book";
  const description = item.description || "No description available";
  const executiveSummary = item.executiveSummary || "";
  const coreConcepts = item.coreConcepts || [];
  const whyReadThis = item.whyReadThis || "";
  const categories = item.categories || [];

  if (viewMode === "list") {
    return (
      <motion.div {...scaleOnHover}>
        <Card className='bg-white shadow-lg hover:shadow-xl border-0 overflow-hidden transition-all duration-300'>
          <CardContent className='p-0'>
            <div className='flex lg:flex-row flex-col'>
              {/* Book Cover */}
              <div className='flex-shrink-0 lg:w-64'>
                <div className='relative w-full h-64 lg:h-full'>
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={item.alt?.current || bookTitle}
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 100vw, 256px'
                  />
                </div>
              </div>

              {/* Executive Summary */}
              {description && (
                <div className='mb-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Target className='w-4 h-4 text-blue-500' />
                    <h4 className='font-semibold text-gray-900'>Description</h4>
                  </div>
                  <p className='text-gray-600 line-clamp-3 leading-relaxed'>
                    {description}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className='flex flex-col flex-1 justify-between p-6'>
                <div>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex-1'>
                      {/* Categories */}
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
                      <h3 className='mb-3 font-bold text-gray-900 text-2xl line-clamp-2'>
                        {bookTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  {executiveSummary && (
                    <div className='mb-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Target className='w-4 h-4 text-blue-500' />
                        <h4 className='font-semibold text-gray-900'>
                          Executive Summary
                        </h4>
                      </div>
                      <p className='text-gray-600 line-clamp-3 leading-relaxed'>
                        {executiveSummary}
                      </p>
                    </div>
                  )}

                  {/* Core Concepts */}
                  {coreConcepts.length > 0 && (
                    <div className='mb-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Lightbulb className='w-4 h-4 text-yellow-500' />
                        <h4 className='font-semibold text-gray-900'>
                          Key Concepts
                        </h4>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        {coreConcepts.slice(0, 4).map((concept, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'
                          >
                            {concept}
                          </Badge>
                        ))}
                        {coreConcepts.length > 4 && (
                          <Badge variant='outline' className='text-xs'>
                            +{coreConcepts.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Why Read This */}
                  {whyReadThis && (
                    <div className='mb-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <CheckCircle className='w-4 h-4 text-green-500' />
                        <h4 className='font-semibold text-gray-900'>
                          Why Read This
                        </h4>
                      </div>
                      <p className='text-gray-600 line-clamp-2 leading-relaxed'>
                        {whyReadThis}
                      </p>
                    </div>
                  )}
                </div>

                <div className='flex justify-between items-center pt-4 border-gray-100 border-t'>
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
            {/* Categories overlay */}
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

          {/* Content */}
          <div className='flex flex-col flex-1 p-4'>
            <h3 className='mb-3 min-h-[3.5rem] font-bold text-gray-900 text-lg line-clamp-2'>
              {bookTitle}
            </h3>

            {/* Executive Summary */}
            {executiveSummary && (
              <div className='mb-3'>
                <p className='text-gray-600 text-sm line-clamp-2 leading-relaxed'>
                  {executiveSummary}
                </p>
              </div>
            )}

            {/* Core Concepts */}
            {coreConcepts.length > 0 && (
              <div className='mb-3'>
                <div className='flex flex-wrap gap-1'>
                  {coreConcepts.slice(0, 3).map((concept, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {concept}
                    </Badge>
                  ))}
                  {coreConcepts.length > 3 && (
                    <Badge variant='outline' className='text-xs'>
                      +{coreConcepts.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Why Read This */}
            {whyReadThis && (
              <div className='flex-1 mb-4'>
                <p className='text-gray-600 text-sm line-clamp-2 leading-relaxed'>
                  {whyReadThis}
                </p>
              </div>
            )}

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
