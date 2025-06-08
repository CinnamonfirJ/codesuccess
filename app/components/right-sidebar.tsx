"use client";

import type React from "react";
import { useState } from "react";
import {
  ChevronDown,
  Users,
  Award,
  Star,
  Calendar,
  Heart,
  Trophy,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    <div className='border-gray-100 border-b last:border-b-0'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex justify-between items-center hover:bg-gray-50 p-4 rounded-lg w-full text-left transition-colors'
      >
        <div className='flex items-center gap-3'>
          {icon}
          <span className='font-medium text-gray-900'>{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className='w-5 h-5 text-gray-500' />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className='overflow-hidden'
      >
        <div className='space-y-2 p-4 pt-0 pl-11'>{children}</div>
      </motion.div>
    </div>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

interface RightSidebarProps {
  onNavigate: (path: string) => void;
}

export default function RightSidebar({ onNavigate }: RightSidebarProps) {
  return (
    <motion.div
      className='space-y-6'
      variants={fadeInUp}
      initial='initial'
      animate='animate'
    >
      {/* Header Card */}
      <Card className='bg-gradient-to-r from-orange-500 to-pink-500 shadow-xl border-0 text-white'>
        <CardHeader className='p-6 text-center'>
          <div className='flex justify-center items-center bg-white/20 mx-auto mb-3 rounded-full w-12 h-12'>
            <Zap className='w-6 h-6' />
          </div>
          <h2 className='font-bold text-xl'>Opportunities</h2>
          <p className='text-orange-100 text-sm'>
            Discover amazing ways to grow
          </p>
        </CardHeader>
      </Card>

      {/* Opportunities Sections */}
      <Card className='bg-white shadow-lg border-0'>
        <CardContent className='p-0'>
          <div className='divide-y divide-gray-100'>
            <ExpandableSection
              title='Mentorship & Live Events'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg w-8 h-8'>
                  <Calendar className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-blue-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-blue-600'>
                    Upcoming Workshops
                  </span>
                  <Badge className='bg-blue-100 ml-auto text-blue-700 text-xs'>
                    3 New
                  </Badge>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-blue-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-blue-600'>
                    Find a Mentor
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-blue-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-blue-600'>
                    Live Q&A Sessions
                  </span>
                  <Badge className='bg-green-100 ml-auto text-green-700 text-xs'>
                    Live
                  </Badge>
                </a>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Challenges & Competitions'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-orange-500 to-red-500 rounded-lg w-8 h-8'>
                  <Trophy className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-orange-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-orange-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-orange-600'>
                    Coding Challenges
                  </span>
                  <Badge className='bg-orange-100 ml-auto text-orange-700 text-xs'>
                    ₦50k Prize
                  </Badge>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-orange-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-orange-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-orange-600'>
                    Creative Competitions
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-orange-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-orange-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-orange-600'>
                    Win Rewards
                  </span>
                </a>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Our Heroes'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg w-8 h-8'>
                  <Star className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-yellow-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-yellow-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-yellow-600'>
                    Tech Innovators
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-yellow-50 p-3 rounded-lg transition-colors'
                  onClick={() => onNavigate(`/`)}
                >
                  <div className='bg-yellow-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-yellow-600'>
                    Social Entrepreneurs
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-yellow-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-yellow-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-yellow-600'>
                    Community Leaders
                  </span>
                </a>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Special Guests'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-8 h-8'>
                  <Users className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-purple-600'>
                    Upcoming Guests
                  </span>
                  <Badge className='bg-purple-100 ml-auto text-purple-700 text-xs'>
                    This Week
                  </Badge>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-purple-600'>
                    Past Interviews
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-purple-600'>
                    Submit Questions
                  </span>
                </a>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Success Stories'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg w-8 h-8'>
                  <Heart className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-green-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-green-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-green-600'>
                    Member Testimonials
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-green-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-green-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-green-600'>
                    Career Transformations
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-green-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-green-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-green-600'>
                    Share Your Story
                  </span>
                </a>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Our Role Models'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg w-8 h-8'>
                  <Award className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-indigo-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-indigo-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-indigo-600'>
                    Industry Leaders
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-indigo-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-indigo-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-indigo-600'>
                    Community Champions
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-indigo-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-indigo-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-indigo-600'>
                    Nominate a Role Model
                  </span>
                </a>
              </div>
            </ExpandableSection>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
