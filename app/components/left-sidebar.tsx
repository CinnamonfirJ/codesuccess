"use client";
import {
  User,
  MessageSquare,
  BookOpen,
  Heart,
  GraduationCap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { ExpandableSection } from "./ExpandableSection";
import CourseLink from "./courseLink";
import type { GetCoursesQueryResult } from "@/sanity.types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

interface LeftSidebarProps {
  courses: GetCoursesQueryResult;
  onNavigate?: (path: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LeftSidebar({ courses, onNavigate }: LeftSidebarProps) {
  const { user, isLoading } = useUser();

  // useEffect(() => {
  //   async function fetchUser() {
  //     const user = await getUser();
  //     setUser(user);
  //     setLoading(false);
  //   }

  //   fetchUser();
  // }, []);

  return (
    <motion.div
      className='space-y-6'
      variants={fadeInUp}
      initial='initial'
      animate='animate'
    >
      {/* User Profile Card */}
      <Card className='bg-white shadow-xl border-0 overflow-hidden'>
        <CardHeader className='bg-gradient-to-r from-emerald-500 to-blue-500 p-3 text-white'>
          <div className='flex flex-col items-center text-center'>
            <Avatar className='mb-2 border-4 border-white/20 w-16 h-16'>
              <AvatarImage
                src={user?.profile?.profile_image || "/placeholder.svg"}
                alt='User'
              />
              <AvatarFallback className='bg-white/20 font-bold text-white text-xl'>
                {user?.first_name[0]}
                {user?.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className='mb-2 font-bold text-xl'>
              {user?.first_name} {user?.last_name}
            </h2>
            {/* <Badge className='bg-white/20 mb-3 text-white'>Rising Star</Badge> */}
            <p className='text-emerald-100 text-sm leading-relaxed'>
              {isLoading && "Loading..."}
              {user?.profile?.bio ||
                "Welcome to your profile! Update your bio and explore courses."}
            </p>
          </div>
        </CardHeader>
        {/* <CardContent className='p-4'>
          <div className='gap-4 grid grid-cols-3 text-center'>
            <div>
              <div className='font-bold text-emerald-600 text-lg'>12</div>
              <div className='text-gray-600 text-xs'>Courses</div>
            </div>
            <div>
              <div className='font-bold text-blue-600 text-lg'>89%</div>
              <div className='text-gray-600 text-xs'>Progress</div>
            </div>
            <div>
              <div className='font-bold text-purple-600 text-lg'>156</div>
              <div className='text-gray-600 text-xs'>Points</div>
            </div>
          </div>
        </CardContent> */}
      </Card>

      {/* Navigation Sections */}
      <Card className='bg-white shadow-lg border-0'>
        <CardContent className='p-0'>
          <div className='divide-y divide-gray-100'>
            <ExpandableSection
              title='About Me'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-8 h-8'>
                  <User className='w-4 h-4 text-white' />
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
                    Upcoming Advertise Your Business
                  </span>
                </a>
                {/* <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-purple-600'>
                    Share a New Goal
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-purple-600'>
                    Share Your Journey
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-purple-600'>
                    Share Your Determination
                  </span>
                </a> */}
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Daily Affirmations'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-pink-500 to-red-500 rounded-lg w-8 h-8'>
                  <Heart className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-pink-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-pink-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-pink-600'>
                    Upcoming Today&apos;s Affirmations
                  </span>
                </a>
                {/* <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-pink-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-pink-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-pink-600'>
                    Browse by Theme
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-pink-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-pink-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-pink-600'>
                    Audio Affirmations
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-pink-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-pink-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-pink-600'>
                    Create Your Own
                  </span>
                </a> */}
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Start CodeSuccex'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg w-8 h-8'>
                  <GraduationCap className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                {courses && courses.length > 0 ? (
                  <CourseLink
                    key={courses[0]._id}
                    course={courses[0]}
                    onClick={() => onNavigate?.(`/courses/${courses[0].slug}`)}
                    href={`/courses/${courses[0].slug}`}
                  />
                ) : (
                  <div className='p-3 text-center'>
                    <div className='flex justify-center items-center bg-gray-100 mx-auto mb-2 rounded-full w-12 h-12'>
                      <BookOpen className='w-6 h-6 text-gray-400' />
                    </div>
                    <p className='text-gray-500 text-sm'>
                      No courses available
                    </p>
                  </div>
                )}

                {/* {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <CourseLink
                      key={course._id}
                      course={course}
                      onClick={() => onNavigate?.(`/courses/${course.slug}`)}
                      href={`/courses/${course.slug}`}
                    />
                  ))
                ) : (
                  <div className='p-3 text-center'>
                    <div className='flex justify-center items-center bg-gray-100 mx-auto mb-2 rounded-full w-12 h-12'>
                      <BookOpen className='w-6 h-6 text-gray-400' />
                    </div>
                    <p className='text-gray-500 text-sm'>
                      No courses available
                    </p>
                  </div>
                )} */}
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Safe Peer Space'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg w-8 h-8'>
                  <MessageSquare className='w-4 h-4 text-white' />
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
                    Join a Group Upcoming
                  </span>
                </a>
                {/* <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-blue-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-blue-600'>
                    Create a Group
                  </span>
                </a>
                <a
                  href='#'
                  className='group flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-blue-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-blue-600'>
                    My Groups
                  </span>
                </a> */}
              </div>
            </ExpandableSection>

            <ExpandableSection
              title='Reading Lists'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg w-8 h-8'>
                  <BookOpen className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <Link
                  href='/reading-list'
                  className='group flex items-center gap-3 hover:bg-indigo-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-indigo-400 rounded-full w-2 h-2' />
                  <span className='text-gray-700 group-hover:text-indigo-600'>
                    View All Reading Lists
                  </span>
                </Link>
              </div>
            </ExpandableSection>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
