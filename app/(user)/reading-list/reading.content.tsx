"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid,
  List,
  Search,
  BookOpen,
  ExternalLink,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import ReadingListItem from "@/app/components/reading-list-item";
import Link from "next/link";

// Define the book type with categories array
interface BookWithCategories {
  _id: string;
  bookTitle?: string;
  description?: string;
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

const categories = [
  { label: "All", value: "all" },
  { label: "Mindset", value: "mindset" },
  { label: "Motivation", value: "motivation" },
  { label: "Purpose Discovery", value: "purpose-discovery" },
  { label: "Financial Literacy", value: "financial-literacy" },
  { label: "Communication", value: "communication" },
  { label: "Confidence", value: "confidence" },
  { label: "Emotional Intelligence", value: "emotional-intelligence" },
];

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

interface ReadingListClientProps {
  initialBooks: BookWithCategories[];
  error?: string;
}

export default function ReadingListClient({
  initialBooks,
  error,
}: ReadingListClientProps) {
  // Ensure we always have an array, even if the data structure is unexpected
  const [books] = useState<BookWithCategories[]>(
    Array.isArray(initialBooks) ? initialBooks : []
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    // Double-check that books is an array before filtering
    if (!Array.isArray(books)) {
      console.warn("Books data is not an array:", books);
      return [];
    }

    return books.filter((book) => {
      // Handle multiple categories - check if any of the book's categories match the selected category
      const matchesCategory =
        selectedCategory === "all" ||
        (book.categories &&
          Array.isArray(book.categories) &&
          book.categories.includes(selectedCategory));

      const matchesSearch =
        searchQuery === "" ||
        (book.bookTitle &&
          book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (book.description &&
          book.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  const getCategoryCount = (category: string) => {
    if (!Array.isArray(books)) return 0;
    if (category === "all") return books.length;

    // Count books that have this category in their categories array
    return books.filter(
      (book) =>
        book.categories &&
        Array.isArray(book.categories) &&
        book.categories.includes(category)
    ).length;
  };

  // Show loading state if no books and no error
  if (!books.length && !error) {
    return (
      <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
        <div className='mx-auto px-6 py-8 max-w-7xl'>
          <div className='py-20 text-center'>
            <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-4 rounded-full w-16 h-16'>
              <div className='border-2 border-white/30 border-t-white rounded-full w-8 h-8 animate-spin'></div>
            </div>
            <h2 className='mb-2 font-bold text-gray-900 text-2xl'>
              Loading Reading List...
            </h2>
            <p className='text-gray-600'>
              Fetching the best book recommendations for you
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error and no books
  if (error && !books.length) {
    return (
      <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
        <div className='mx-auto px-6 py-8 max-w-7xl'>
          <div className='py-20 text-center'>
            <Card className='bg-white shadow-lg mx-auto border-0 max-w-md'>
              <CardContent className='p-12'>
                <div className='flex justify-center items-center bg-red-100 mx-auto mb-6 rounded-full w-20 h-20'>
                  <BookOpen className='w-10 h-10 text-red-500' />
                </div>
                <h3 className='mb-4 font-semibold text-gray-900 text-xl'>
                  Unable to Load Reading List
                </h3>
                <p className='mb-6 text-gray-600'>{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
      <div className='mx-auto px-6 py-8 max-w-7xl'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='mb-8 text-center'>
            <div className='flex justify-start items-center mb-4'>
              <Link href='/homepage'>
                <Button variant='ghost' className='gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Home
                </Button>
              </Link>
            </div>
            <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-4 rounded-full w-16 h-16'>
              <BookOpen className='w-8 h-8 text-white' />
            </div>
            <h1 className='mb-4 font-bold text-gray-900 text-4xl lg:text-5xl'>
              Reading List
            </h1>
            <p className='mx-auto max-w-3xl text-gray-600 text-xl'>
              Discover carefully curated books that will accelerate your
              personal and professional growth. Each recommendation is chosen to
              help you on your journey to success.
            </p>
            {error && books.length > 0 && (
              <div className='bg-yellow-50 mx-auto mt-4 p-4 border border-yellow-200 rounded-lg max-w-2xl'>
                <p className='text-yellow-800 text-sm'>
                  <strong>Note:</strong> {error}
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <Card className='bg-white shadow-lg p-6 border-0'>
            <div className='flex lg:flex-row flex-col justify-between items-center gap-4'>
              {/* Search */}
              <div className='relative flex-1 max-w-md'>
                <Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
                <Input
                  placeholder='Search books...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-gray-200 focus:border-emerald-500 h-12'
                />
              </div>

              <div className='flex items-center gap-4'>
                {/* Category Filter */}
                <div className='flex items-center gap-2'>
                  <Filter className='w-4 h-4 text-gray-500' />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className='border-gray-200 w-48 h-12'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className='flex justify-between items-center w-full'>
                            <span>{category.label}</span>
                            <Badge variant='outline' className='ml-2 text-xs'>
                              {getCategoryCount(category.value)}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Toggle */}
                <div className='flex items-center bg-gray-100 p-1 rounded-lg'>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size='sm'
                    onClick={() => setViewMode("grid")}
                    className={`${
                      viewMode === "grid"
                        ? "bg-white shadow-sm text-emerald-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid className='w-4 h-4' />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size='sm'
                    onClick={() => setViewMode("list")}
                    className={`${
                      viewMode === "list"
                        ? "bg-white shadow-sm text-emerald-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Info */}
        <motion.div
          className='mb-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className='flex justify-between items-center'>
            <p className='text-gray-600'>
              Showing{" "}
              <span className='font-semibold text-gray-900'>
                {filteredBooks.length}
              </span>{" "}
              books
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  in{" "}
                  <span className='font-semibold text-emerald-600'>
                    {selectedCategory}
                  </span>
                </span>
              )}
              {searchQuery && (
                <span>
                  {" "}
                  for &apos;
                  <span className='font-semibold text-blue-600'>
                    {searchQuery}
                  </span>
                  &apos;
                </span>
              )}
            </p>
            {(selectedCategory !== "all" || searchQuery) && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className='text-gray-600 hover:text-gray-900'
              >
                Clear filters
              </Button>
            )}
          </div>
        </motion.div>

        {/* Books Grid/List */}
        {filteredBooks.length > 0 ? (
          <motion.div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {filteredBooks.map((book) => (
              <motion.div key={book._id} variants={fadeInUp}>
                <ReadingListItem item={book} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className='py-20 text-center'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className='bg-white shadow-lg mx-auto border-0 max-w-md'>
              <CardContent className='p-12'>
                <div className='flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-20 h-20'>
                  <BookOpen className='w-10 h-10 text-gray-400' />
                </div>
                <h3 className='mb-4 font-semibold text-gray-900 text-xl'>
                  No books found
                </h3>
                <p className='mb-6 text-gray-600'>
                  We couldn&apos;t find any books matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                >
                  View All Books
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredBooks.length > 0 && (
          <motion.div
            className='mt-16'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className='bg-gradient-to-r from-emerald-500 to-blue-500 shadow-xl border-0 text-white'>
              <CardContent className='p-8 text-center'>
                <h3 className='mb-4 font-bold text-2xl'>
                  Start Your Reading Journey Today
                </h3>
                <p className='mx-auto mb-6 max-w-2xl text-emerald-100 text-lg'>
                  Knowledge is power. Each book you read brings you one step
                  closer to achieving your goals and unlocking your full
                  potential.
                </p>
                <div className='flex sm:flex-row flex-col justify-center gap-4'>
                  <Button className='bg-white hover:bg-gray-100 px-8 py-3 font-semibold text-emerald-600 text-lg'>
                    <BookOpen className='mr-2 w-5 h-5' />
                    Join Reading Community
                  </Button>
                  <Button
                    variant='outline'
                    className='hover:bg-white/10 px-8 py-3 border-white font-semibold text-white text-lg'
                  >
                    <ExternalLink className='mr-2 w-5 h-5' />
                    Suggest a Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
