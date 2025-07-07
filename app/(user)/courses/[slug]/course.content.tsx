"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Users,
  Star,
  Award,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CourseContentProps {
  course: any; // Replace with your actual course type
  slug: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
};

export default function CourseContent({ course, slug }: CourseContentProps) {
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(
    new Set()
  );

  // Handle case when course is not found
  if (!course || Object.keys(course).length === 0) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-red-50 to-orange-50 min-h-screen'>
        <Card className='mx-4 max-w-md'>
          <CardContent className='p-2 md:p-8 text-center'>
            <div className='flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16'>
              <BookOpen className='w-8 h-8 text-red-500' />
            </div>
            <h2 className='mb-2 font-bold text-gray-900 text-2xl'>
              Course Not Found
            </h2>
            <p className='mb-6 text-gray-600'>
              The course you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link href='/homepage'>
              <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                <ArrowLeft className='mr-2 w-4 h-4' />
                Back
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate progress
  const totalSessions =
    course?.modules?.reduce(
      (total: number, module: any) =>
        total + (module.studySessions?.length || 0),
      0
    ) || 0;
  const completedCount = completedSessions.size;
  const progressPercentage =
    totalSessions > 0 ? (completedCount / totalSessions) * 100 : 0;

  const toggleSessionCompletion = (sessionKey: string) => {
    setCompletedSessions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sessionKey)) {
        newSet.delete(sessionKey);
      } else {
        newSet.add(sessionKey);
      }
      return newSet;
    });
  };

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
      <div className='mx-auto mt-10 px-2 md:px-6 py-8 md:max-w-7xl'>
        {/* Header Section */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href='/homepage'
            className='group inline-flex items-center mb-6 font-medium text-emerald-600 hover:text-emerald-700 transition-colors'
          >
            <ArrowLeft className='mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1' />
            Back
          </Link>

          <div className='bg-white shadow-xl p-8 border border-gray-100 rounded-2xl'>
            <div className='flex lg:flex-row flex-col lg:justify-between lg:items-center gap-6'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl w-12 h-12'>
                    <BookOpen className='w-6 h-6 text-white' />
                  </div>
                  <Badge className='bg-emerald-100 px-3 py-1 text-emerald-700'>
                    Course
                  </Badge>
                </div>
                <h1 className='mb-4 font-bold text-gray-900 text-xl md:text-3xl lg:text-5xl leading-tight'>
                  {course.title}
                </h1>
                <p className='mb-6 text-gray-600 text-sm md:text-xl'>
                  Master the skills you need to succeed with our comprehensive
                  course modules and hands-on sessions.
                </p>

                <div className='flex flex-wrap items-center gap-6 text-gray-600 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Target className='w-4 h-4 text-emerald-500' />
                    <span>{course.modules?.length || 0} Modules</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-blue-500' />
                    <span>{totalSessions} Sessions</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4 text-purple-500' />
                    <span>2,500+ Students</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Star className='fill-current w-4 h-4 text-yellow-500' />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>

              <div className='lg:w-80'>
                <Card className='bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200'>
                  <CardContent className='p-6'>
                    <div className='flex justify-between items-center mb-4'>
                      <h3 className='font-semibold text-gray-900'>
                        Your Progress
                      </h3>
                      <Badge className='bg-emerald-500 text-white'>
                        {Math.round(progressPercentage)}%
                      </Badge>
                    </div>
                    <Progress value={progressPercentage} className='mb-4' />
                    <div className='flex justify-between text-gray-600 text-sm'>
                      <span>{completedCount} completed</span>
                      <span>{totalSessions} total sessions</span>
                    </div>
                    {progressPercentage === 100 && (
                      <div className='flex items-center gap-2 bg-emerald-100 mt-4 p-3 rounded-lg'>
                        <Award className='w-5 h-5 text-emerald-600' />
                        <span className='font-medium text-emerald-700'>
                          Course Completed!
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules Section */}
        {course?.modules && course.modules.length > 0 ? (
          <motion.div
            className='space-y-8'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {course.modules.map((module: any, moduleIndex: number) => (
              <motion.div key={module._id} variants={fadeInUp}>
                <Card className='bg-white shadow-xl border-0 overflow-hidden'>
                  <CardHeader className='bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-4'>
                        <div className='flex justify-center items-center bg-white/20 rounded-xl w-12 h-12'>
                          <span className='font-bold text-xl'>
                            {moduleIndex + 1}
                          </span>
                        </div>
                        <div>
                          <h2 className='mb-2 font-bold text-2xl lg:text-3xl'>
                            {module.title}
                          </h2>
                          <p className='text-gray-300'>
                            {module.studySessions?.length || 0} sessions in this
                            module
                          </p>
                        </div>
                      </div>
                      <Badge className='bg-white/20 px-4 py-2 text-white'>
                        Module {moduleIndex + 1}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className='p-2 md:p-8'>
                    {module.studySessions && module.studySessions.length > 0 ? (
                      <motion.div
                        className='gap-4 grid md:grid-cols-2 lg:grid-cols-3'
                        variants={staggerContainer}
                        initial='initial'
                        animate='animate'
                      >
                        {module.studySessions.map(
                          (session: any, sessionIndex: number) => {
                            const isCompleted = completedSessions.has(
                              session[0]._key
                            );
                            return (
                              <motion.div
                                key={session._key}
                                variants={fadeInUp}
                                {...scaleOnHover}
                              >
                                <Card
                                  className={`h-full transition-all duration-300 cursor-pointer border-2 ${
                                    isCompleted
                                      ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg"
                                      : "bg-white hover:bg-gray-50 border-gray-200 hover:border-emerald-300 hover:shadow-lg"
                                  }`}
                                  onClick={() =>
                                    toggleSessionCompletion(session[0]._key)
                                  }
                                >
                                  <CardContent className='p-6'>
                                    <div className='flex items-start gap-4'>
                                      <div className='flex-shrink-0 mt-1'>
                                        {isCompleted ? (
                                          <CheckCircle2 className='w-6 h-6 text-emerald-500' />
                                        ) : (
                                          <Circle className='w-6 h-6 text-gray-400' />
                                        )}
                                      </div>
                                      <div className='flex-1 min-w-0'>
                                        <div className='flex items-center gap-2 mb-2'>
                                          <Badge
                                            variant='outline'
                                            className='px-2 py-1 text-xs'
                                          >
                                            Session {sessionIndex + 1}
                                          </Badge>
                                        </div>
                                        <h3
                                          className={`font-semibold text-lg mb-3 leading-tight ${
                                            isCompleted
                                              ? "text-emerald-800"
                                              : "text-gray-900"
                                          }`}
                                        >
                                          {session.title}
                                        </h3>
                                        <div className='flex justify-between items-center'>
                                          <div className='flex items-center gap-2 text-gray-600 text-sm'>
                                            <Clock className='w-4 h-4' />
                                            <span>15 min</span>
                                          </div>
                                          <Link
                                            href={`/courses/${slug}/${module._id}/${session._key}`}
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <Button
                                              size='sm'
                                              className={`${
                                                isCompleted
                                                  ? "bg-emerald-500 hover:bg-emerald-600"
                                                  : "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                                              } text-white`}
                                            >
                                              <Play className='mr-2 w-3 h-3' />
                                              {isCompleted ? "Review" : "Start"}
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
                        )}
                      </motion.div>
                    ) : (
                      <div className='py-12 text-center'>
                        <div className='flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16'>
                          <BookOpen className='w-8 h-8 text-gray-400' />
                        </div>
                        <h3 className='mb-2 font-medium text-gray-900 text-lg'>
                          No Sessions Available
                        </h3>
                        <p className='text-gray-600'>
                          Study sessions for this module are coming soon.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
            <Card className='mx-auto max-w-md'>
              <CardContent className='p-12'>
                <div className='flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-20 h-20'>
                  <BookOpen className='w-10 h-10 text-gray-400' />
                </div>
                <h2 className='mb-4 font-bold text-gray-900 text-2xl'>
                  No Modules Available
                </h2>
                <p className='mb-6 text-gray-600'>
                  Course content is being prepared. Check back soon for exciting
                  modules and sessions!
                </p>
                <Link href='/profile/me'>
                  <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                    Browse Other Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Course Completion CTA */}
        {progressPercentage > 0 && progressPercentage < 100 && (
          <motion.div
            className='mt-12'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className='bg-gradient-to-r from-emerald-500 to-blue-500 border-0 text-white'>
              <CardContent className='p-8 text-center'>
                <h3 className='mb-4 font-bold text-2xl'>
                  Keep Going! You&apos;re Doing Great!
                </h3>
                <p className='mb-6 text-emerald-100 text-lg'>
                  You&apos;ve completed {completedCount} out of {totalSessions}{" "}
                  sessions. You&apos;re {Math.round(progressPercentage)}% of the
                  way there!
                </p>
                <Button
                  size='lg'
                  className='bg-white hover:bg-gray-100 px-8 py-3 font-semibold text-emerald-600 text-lg'
                >
                  Continue Learning
                  <Play className='ml-2 w-5 h-5' />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
