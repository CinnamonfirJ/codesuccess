"use client";
import {
  User,
  MessageSquare,
  BookOpen,
  Heart,
  GraduationCap,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExpandableSection } from "./ExpandableSection";
import CourseLink from "./courseLink";
import type { GetCoursesQueryResult } from "@/sanity.types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getAffirmations } from "@/sanity/lib/affirmations/getAffirmations";
import PostModal from "./postModal";

interface LeftSidebarProps {
  courses: GetCoursesQueryResult;
  onNavigate?: (path: string) => void;
}

interface Affirmation {
  _id: string;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  title?: string | null;
  category?: string | null;
  description?: string | null;
  subCategory?: string | null;
  affirmationList?: string[] | null;
  isChallenge?: boolean | null;
  challengeDay?: number | null;
  challengeTheme?: string | null;
  dailyFocusActivity?: string | null;
  reflectionQuestion?: string | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LeftSidebar({ courses, onNavigate }: LeftSidebarProps) {
  const { user, isLoading } = useUser();
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [isLoadingAffirmations, setIsLoadingAffirmations] = useState(true);

  // Modal controls
  const [openModal, setOpenModal] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<string>("");

  const postTypes = [
    "Advertise your Biz",
    "Share a new goal",
    "Share your Journey",
    "Share your determination",
    "Share something encouraging",
    "Share your Joy",
    "Nominate a hero",
  ];

  useEffect(() => {
    async function fetchAffirmations() {
      try {
        const affirmationData = await getAffirmations();
        setAffirmations(
          Array.isArray(affirmationData) ? affirmationData.slice(0, 3) : []
        );
      } catch (error) {
        console.error("Failed to fetch affirmations:", error);
        setAffirmations([]);
      } finally {
        setIsLoadingAffirmations(false);
      }
    }
    fetchAffirmations();
  }, []);

  function handleOpenPostType(type: string) {
    setSelectedPostType(type);
    setOpenModal(true);
  }

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
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className='mb-2 font-bold text-xl'>
              {user?.first_name} {user?.last_name}
            </h2>
            <p className='text-emerald-100 text-sm leading-relaxed'>
              {isLoading && "Loading..."}
              {user?.profile?.bio ||
                "Welcome to your profile! Update your bio and explore courses."}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Sections */}
      <Card className='bg-white shadow-lg border-0'>
        <CardContent className='p-0'>
          <div className='divide-y divide-gray-100'>
            {/* About Me Section with Post Types */}
            <ExpandableSection
              title='About Me'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-8 h-8'>
                  <User className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                {postTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleOpenPostType(type)}
                    className='group flex items-center gap-3 hover:bg-purple-50 p-3 rounded-lg w-full text-left transition-colors'
                  >
                    <div className='bg-purple-400 rounded-full w-2 h-2'></div>
                    <span className='text-gray-700 group-hover:text-purple-600'>
                      {type}
                    </span>
                  </button>
                ))}
              </div>
            </ExpandableSection>

            {/* Daily Affirmations */}
            <ExpandableSection
              title='Daily Affirmations'
              icon={
                <div className='flex justify-center items-center bg-gradient-to-r from-pink-500 to-red-500 rounded-lg w-8 h-8'>
                  <Heart className='w-4 h-4 text-white' />
                </div>
              }
            >
              <div className='space-y-2'>
                <Link
                  href='/affirmations'
                  className='group flex items-center gap-3 hover:bg-pink-50 p-3 rounded-lg transition-colors'
                >
                  <div className='bg-pink-400 rounded-full w-2 h-2'></div>
                  <span className='text-gray-700 group-hover:text-pink-600'>
                    Browse All Affirmations
                  </span>
                </Link>

                {isLoadingAffirmations ? (
                  <div className='space-y-3'>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='flex items-center gap-3 p-3 rounded-lg'
                      >
                        <div className='bg-gray-300 rounded-full w-2 h-2 animate-pulse'></div>
                        <div className='flex-1'>
                          <div className='bg-gray-300 mb-1 rounded h-4 animate-pulse'></div>
                          <div className='bg-gray-200 rounded w-2/3 h-3 animate-pulse'></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : affirmations && affirmations.length > 0 ? (
                  <Link
                    href={`/affirmations/${affirmations[0]._id}`}
                    className='group flex items-center gap-3 hover:bg-pink-50 p-3 rounded-lg transition-colors'
                  >
                    <div className='bg-pink-400 rounded-full w-2 h-2'></div>
                    <span className='text-gray-700 group-hover:text-pink-600 truncate'>
                      {affirmations[0].title}
                    </span>
                  </Link>
                ) : (
                  <div className='p-3 text-center'>
                    <div className='flex justify-center items-center bg-gray-100 mx-auto mb-2 rounded-full w-12 h-12'>
                      <Heart className='w-6 h-6 text-gray-400' />
                    </div>
                    <p className='text-gray-500 text-sm'>
                      No affirmations available
                    </p>
                  </div>
                )}
              </div>
            </ExpandableSection>

            {/* Start CodeSuccex Section */}
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
                )}
              </div>
            </ExpandableSection>

            {/* Safe Peer Space */}
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
              </div>
            </ExpandableSection>

            {/* Find People */}
            <Link
              href='/follows'
              className='group flex items-center gap-3 hover:bg-emerald-50 p-4 transition-colors'
            >
              <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg w-8 h-8'>
                <Users className='w-4 h-4 text-white' />
              </div>
              <span className='font-medium text-gray-700 group-hover:text-emerald-600'>
                Find People
              </span>
            </Link>

            {/* Reading Lists */}
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

      {/* Post Modal */}
      <PostModal
        open={openModal}
        onOpenChange={setOpenModal}
        type={selectedPostType}
        onPostCreated={() => console.log("Post created")}
      />
    </motion.div>
  );
}
