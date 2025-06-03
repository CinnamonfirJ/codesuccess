import type React from "react";

import { User, MessageSquare, BookOpen, Heart, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExpandableSection } from "./ExpandableSection";
import { getCourses } from "@/sanity/lib/courses/getCourses";
import CourseLink from "./courseLink";

interface course {
  course?: any; // Adjust type as needed
}

export default async function LeftSidebar({ course }: LeftSidebarProps) {
  const courses = await getCourses();

  console.log("Courses fetched for left sidebar:", courses);

  return (
    <div className='bg-white h-full'>
      {/* User Profile */}
      <div className='p-6 border-gray-200 border-b'>
        <div className='flex flex-col items-center text-center'>
          <Avatar className='mb-4 w-20 h-20'>
            <AvatarImage
              src='/muhammad-taha-ibrahim-boIrez2f5hs-unsplash.jpg'
              alt='User'
            />
            <AvatarFallback className='bg-teal-100 text-teal-800'>
              JD
            </AvatarFallback>
          </Avatar>
          <h2 className='font-bold text-lg'>Jane Doe</h2>
          <p className='mt-1 text-gray-600 text-sm'>
            Aspiring developer passionate about creating positive change through
            technology.
          </p>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className='divide-y divide-gray-200'>
        <ExpandableSection
          title='About Me'
          icon={<User className='w-5 h-5 text-navy' />}
        >
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Advertise Your Business
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Share a New Goal
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Share Your Journey
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Share Your Determination
          </a>
        </ExpandableSection>

        <ExpandableSection
          title='Daily Affirmations'
          icon={<Heart className='w-5 h-5 text-coral' />}
        >
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Today&apos;s Affirmations
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Browse Affirmations by Theme
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Audio Affirmations
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Create Your Own Affirmations
          </a>
        </ExpandableSection>

        <ExpandableSection
          title='Start CodeSuccesx'
          icon={<Sparkles className='w-5 h-5 text-coral' />}
        >
          {courses.map((course) => (
            <CourseLink
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Success Reimagined
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Success From Within
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Success Packaging
          </a>
        </ExpandableSection>

        <ExpandableSection
          title='Safe Peer Space'
          icon={<MessageSquare className='w-5 h-5 text-teal' />}
        >
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Join a Group
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Create a Group
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            My Group
          </a>
        </ExpandableSection>

        <ExpandableSection
          title='Reading Lists'
          icon={<BookOpen className='w-5 h-5 text-navy' />}
        >
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Recommended Books
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Browse by Category
          </a>
          <a href='#' className='block py-2 hover:text-coral transition-colors'>
            Book of the Month
          </a>
        </ExpandableSection>
      </div>
    </div>
  );
}
