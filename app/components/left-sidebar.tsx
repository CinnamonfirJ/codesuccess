"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  MessageSquare,
  BookOpen,
  Heart,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const ExpandableSection = ({
  title,
  children,
  icon,
}: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='border-gray-200 border-b last:border-b-0'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex justify-between items-center hover:bg-teal-50 p-4 w-full text-left transition-colors'
      >
        <div className='flex items-center gap-3'>
          {icon}
          <span className='font-medium'>{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className='w-5 h-5 text-gray-500' />
        ) : (
          <ChevronDown className='w-5 h-5 text-gray-500' />
        )}
      </button>
      {isExpanded && (
        <div className='space-y-2 p-4 pt-0 pl-11 text-sm animate-slideDown'>
          {children}
        </div>
      )}
    </div>
  );
};

export default function LeftSidebar() {
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
          title='Start CodeSuccess'
          icon={<Sparkles className='w-5 h-5 text-coral' />}
        >
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
