"use client"; // This is a client component

import { useState, useEffect } from "react";
import { Search, BookOpen, ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { searchCourses } from "@/sanity/lib/courses/searchCourse";

// Mock components for shadcn/ui. In a real project, you would import these from your UI library.
const Button = ({
  children,
  className,
  onClick,
  variant = "default",
  size = "md",
  ...props
}: any) => {
  let baseClasses =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  if (variant === "default") {
    baseClasses += " bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "ghost") {
    baseClasses += " bg-transparent text-gray-700 hover:bg-gray-100";
  } else if (variant === "outline") {
    baseClasses +=
      " bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50";
  }
  if (size === "sm") {
    baseClasses += " px-3 py-1.5 text-sm";
  } else if (size === "md") {
    baseClasses += " px-4 py-2";
  } else if (size === "lg") {
    baseClasses += " px-6 py-3 text-lg";
  }
  return (
    <button
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }: any) => (
  <div className={`rounded-lg bg-white shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className }: any) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Input = ({ className, value, onChange, placeholder, ...props }: any) => (
  <input
    type='text'
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
  />
);

interface Course {
  _id: string;
  title: string;
  description?: string;
  slug: string;
}

interface SearchContentProps {
  initialTerm?: string;
}

// Framer motion variants
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

export default function SearchContent({ initialTerm }: SearchContentProps) {
  const [searchQuery, setSearchQuery] = useState(initialTerm || "");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const fetchedCourses = await searchCourses(searchQuery);
      setCourses(fetchedCourses);
      setIsLoading(false);
    };

    const handler = setTimeout(() => {
      // Update URL only if the search query has changed from the initial term
      if (searchQuery !== window.location.search.split("term=")[1]) {
        // Compare with current URL param
        const newUrl = new URL(window.location.href);
        if (searchQuery) {
          newUrl.searchParams.set("term", searchQuery);
        } else {
          newUrl.searchParams.delete("term");
        }
        window.history.pushState({}, "", newUrl.toString());
      }
      fetchCourses();
    }, 300); // Debounce search

    return () => clearTimeout(handler);
  }, [searchQuery]); // Depend only on searchQuery for fetching and URL update

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
              <a
                href='/homepage'
                className='inline-flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-md text-gray-700 transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                Home
              </a>
            </div>
            <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-4 rounded-full w-16 h-16'>
              <BookOpen className='w-8 h-8 text-white' />
            </div>
            <h1 className='mb-4 font-bold text-gray-900 text-4xl lg:text-5xl'>
              Course Search
            </h1>
            <p className='mx-auto max-w-3xl text-gray-600 text-xl'>
              Explore our wide range of courses designed to help you achieve
              your learning goals.
            </p>
          </div>

          {/* Search Control */}
          <Card className='bg-white shadow-lg p-6 border-0'>
            <div className='flex justify-center items-center'>
              <div className='relative flex-1 max-w-md'>
                <Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
                <Input
                  placeholder='Search courses by title or description...'
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className='pl-10 border-gray-200 focus:border-emerald-500 h-12'
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Info */}
        <motion.div
          className='mt-8 mb-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className='flex justify-between items-center'>
            <p className='text-gray-600'>
              {isLoading ? (
                <span>Loading courses...</span>
              ) : (
                <>
                  Showing{" "}
                  <span className='font-semibold text-gray-900'>
                    {courses.length}
                  </span>{" "}
                  results for &apos;
                  <span className='font-semibold text-blue-600'>
                    {searchQuery || "all courses"}
                  </span>
                  &apos;
                </>
              )}
            </p>
            {searchQuery && !isLoading && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => setSearchQuery("")}
                className='text-gray-600 hover:text-gray-900'
              >
                Clear search
              </Button>
            )}
          </div>
        </motion.div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className='py-20 text-center'>
            <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-4 rounded-full w-16 h-16'>
              <div className='border-2 border-white/30 border-t-white rounded-full w-8 h-8 animate-spin'></div>
            </div>
            <h2 className='mb-2 font-bold text-gray-900 text-2xl'>
              Searching for courses...
            </h2>
            <p className='text-gray-600'>
              Please wait while we find courses matching your criteria.
            </p>
          </div>
        ) : courses.length === 0 ? (
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
                  No courses found
                </h3>
                <p className='mb-6 text-gray-600'>
                  We couldn&apos;t find any courses matching your search
                  criteria. Try adjusting your search terms.
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                >
                  View All Courses
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {courses.map((course) => (
              <motion.div key={course._id} variants={fadeInUp}>
                <Card className='flex flex-col h-full'>
                  <CardContent className='flex-grow p-6'>
                    <h2 className='mb-2 font-semibold text-blue-700 text-xl'>
                      {course.title}
                    </h2>
                    {course.description && (
                      <p className='mb-4 text-gray-600 text-sm line-clamp-3'>
                        {course.description}
                      </p>
                    )}
                    <a
                      href={`/courses/${course.slug}`}
                      className='inline-flex items-center gap-1 text-blue-500 hover:underline'
                    >
                      View Course
                      <ExternalLink className='w-4 h-4' />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
