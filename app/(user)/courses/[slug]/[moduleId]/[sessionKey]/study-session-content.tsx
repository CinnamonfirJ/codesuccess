"use client";

import { PortableText } from "next-sanity";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  Quote,
  Activity,
  Users,
  Lightbulb,
  PenTool,
  Target,
  PlayCircle,
  //   Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface StudySessionContentProps {
  session: any;
  module: any;
  course: any;
  slug: string;
  moduleId: string;
  sessionKey: string;
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

// const scaleOnHover = {
//   whileHover: { scale: 1.02 },
//   whileTap: { scale: 0.98 },
// };

export default function StudySessionContent({
  session,
  module,
  course,
  slug,
  moduleId,
  sessionKey,
}: StudySessionContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  //   const [readingProgress, setReadingProgress] = useState(0);

  // Find current session index and navigation
  const currentSessionIndex =
    module.studySessions?.findIndex((s: any) => s._key === sessionKey) || 0;
  const nextSession = module.studySessions?.[currentSessionIndex + 1];
  const prevSession = module.studySessions?.[currentSessionIndex - 1];

  // Calculate estimated reading time
  const estimatedTime = Math.max(
    5,
    Math.ceil((session.content?.length || 0) / 200)
  );

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
      <div className='mx-auto mt-10 px-2 md:px-6 py-8 md:max-w-5xl'>
        {/* Header Navigation */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex md:flex-row flex-col justify-between md:items-center mb-6'>
            <Link
              href={`/courses/${slug}`}
              className='group inline-flex items-center mb-2 md:mb-0 font-medium text-emerald-600 hover:text-emerald-700 transition-colors'
            >
              <ArrowLeft className='mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1' />
              Back to Course
            </Link>

            <div className='flex items-center gap-4'>
              <Badge className='bg-emerald-100 px-3 py-1 text-emerald-700'>
                Session {currentSessionIndex + 1} of{" "}
                {module.studySessions?.length || 0}
              </Badge>
              <Button
                onClick={handleMarkComplete}
                variant={isCompleted ? "default" : "outline"}
                className={`${
                  isCompleted
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                <CheckCircle2 className='mr-2 w-4 h-4' />
                {isCompleted ? "Completed" : "Mark Complete"}
              </Button>
            </div>
          </div>

          {/* Session Header Card */}
          <Card className='bg-white shadow-xl border-0 overflow-hidden'>
            <CardHeader className='bg-gradient-to-r from-emerald-600 to-blue-600 p-2 md:p-8 text-white'>
              <div className='flex justify-between items-center'>
                <div className='flex-1'>
                  <div className='flex md:flex-row flex-col items-center gap-3 mb-4'>
                    <div className='flex justify-center items-center bg-white/20 rounded-xl w-12 h-12'>
                      <PlayCircle className='w-6 h-6' />
                    </div>
                    <div className='p-2 text-emerald-100 md:text-sm text-wrap'>
                      {course.title} • {module.title}
                    </div>
                  </div>
                  <h1 className='mb-4 font-bold text-lg md:text-3xl lg:text-4xl leading-tight'>
                    {session.title}
                  </h1>
                  <div className='flex items-center gap-3 md:gap-6 text-emerald-100 text-nowrap'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' />
                      <span>{estimatedTime} min read</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Target className='w-4 h-4' />
                      <span>Learning Session</span>
                    </div>
                    {/* <div className='flex items-center gap-2'>
                      <Bookmark className='w-4 h-4' />
                      <span>Save Progress</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          className='space-y-8'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          {/* Quotes Section */}
          {session.quotes?.length > 0 && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg border-purple-200'>
                <CardContent className='p-2 md:p-8'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-10 h-10'>
                      <Quote className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='font-bold text-gray-900 text-lg md:text-2xl'>
                      Inspirational Quotes
                    </h3>
                  </div>
                  <div className='space-y-4'>
                    {session.quotes.map((quote: any, idx: number) => (
                      <motion.div
                        key={idx}
                        className='bg-white/70 p-6 border border-purple-100 rounded-xl'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <blockquote className='mb-3 text-gray-800 text-sm md:text-lg italic'>
                          &#34;{quote.text}&#34;
                        </blockquote>
                        <cite className='font-medium text-purple-600'>
                          — {quote.author}
                        </cite>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Main Content */}
          <motion.div variants={fadeInUp}>
            <Card className='bg-white shadow-lg border-0'>
              <CardContent className='p-2 md:p-8'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl w-10 h-10'>
                    <BookOpen className='w-5 h-5 text-white' />
                  </div>
                  <h3 className='font-bold text-gray-900 text-2xl'>Content</h3>
                </div>
                <div className='max-w-none text-gray-800 leading-relaxed prose prose-lg'>
                  <PortableText value={session.content} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Section */}
          {session.activity && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg border-blue-200'>
                <CardContent className='p-2 md:p-8'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-10 h-10'>
                      <Activity className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='font-bold text-gray-900 text-2xl'>
                      Activity
                    </h3>
                  </div>
                  <div className='space-y-6'>
                    <div className='max-w-none prose prose-lg'>
                      <PortableText value={session.activity.title} />
                    </div>
                    {session.activity.instructions && (
                      <div className='bg-white/70 p-6 border border-blue-100 rounded-xl'>
                        <h4 className='mb-4 font-semibold text-gray-900'>
                          Instructions:
                        </h4>
                        <ul className='space-y-3'>
                          {session.activity.instructions.map(
                            (instruction: any, idx: number) => (
                              <li key={idx} className='flex items-start gap-3'>
                                <div className='flex justify-center items-center bg-blue-500 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-sm'>
                                  {idx + 1}
                                </div>
                                <div className='flex-1 prose prose-sm'>
                                  <PortableText value={instruction} />
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    {session.activity.reflectionPrompt && (
                      <div className='bg-blue-100 p-6 border border-blue-200 rounded-xl'>
                        <h4 className='flex items-center gap-2 mb-3 font-semibold text-blue-900'>
                          <Lightbulb className='w-5 h-5' />
                          Reflection
                        </h4>
                        <p className='text-blue-800'>
                          {session.activity.reflectionPrompt}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Role Play Section */}
          {session.rolePlay && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg border-green-200'>
                <CardContent className='p-2 md:p-8'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-10 h-10'>
                      <Users className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='font-bold text-gray-900 text-2xl'>
                      Role Play
                    </h3>
                  </div>
                  <div className='space-y-6'>
                    <div className='max-w-none prose prose-lg'>
                      <PortableText value={session.rolePlay.title} />
                    </div>
                    <div className='bg-white/70 p-6 border border-green-100 rounded-xl'>
                      <h4 className='mb-3 font-semibold text-green-900'>
                        Scenario:
                      </h4>
                      <div className='prose prose-sm'>
                        <PortableText value={session.rolePlay.scenario} />
                      </div>
                    </div>
                    {session.rolePlay.instructions && (
                      <div className='bg-green-100 p-6 border border-green-200 rounded-xl'>
                        <h4 className='mb-4 font-semibold text-green-900'>
                          Instructions:
                        </h4>
                        <ul className='space-y-3'>
                          {session.rolePlay.instructions.map(
                            (instruction: any, idx: number) => (
                              <li key={idx} className='flex items-start gap-3'>
                                <div className='flex justify-center items-center bg-green-500 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-sm'>
                                  {idx + 1}
                                </div>
                                <div className='flex-1 prose prose-sm'>
                                  <PortableText value={instruction} />
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Summary Section */}
          {session.summaryBox?.content?.length > 0 && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg border-yellow-200'>
                <CardContent className='p-2 md:p-8'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl w-10 h-10'>
                      <Lightbulb className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='font-bold text-gray-900 text-2xl'>
                      Key Takeaways
                    </h3>
                  </div>
                  <div className='bg-white/70 p-6 border border-yellow-100 rounded-xl'>
                    <ul className='space-y-4'>
                      {session.summaryBox.content.map(
                        (summary: any, idx: number) => (
                          <li key={idx} className='flex items-start gap-3'>
                            <div className='flex justify-center items-center bg-yellow-500 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-sm'>
                              ✓
                            </div>
                            <div className='flex-1 prose prose-sm'>
                              <PortableText value={summary} />
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Journaling Prompts */}
          {session.takeawayJournalingPrompts?.length > 0 && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg border-indigo-200'>
                <CardContent className='p-2 md:p-8'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl w-10 h-10'>
                      <PenTool className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='font-bold text-gray-900 text-2xl'>
                      Reflection Prompts
                    </h3>
                  </div>
                  <div className='space-y-4'>
                    {session.takeawayJournalingPrompts.map(
                      (prompt: any, idx: number) => (
                        <div
                          key={idx}
                          className='bg-white/70 p-6 border border-indigo-100 rounded-xl'
                        >
                          <div className='flex items-start gap-3'>
                            <div className='flex justify-center items-center bg-indigo-500 rounded-full w-8 h-8 font-bold text-white text-sm'>
                              {idx + 1}
                            </div>
                            <p className='text-gray-800 text-lg'>
                              {prompt.prompt}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation Footer */}
        <motion.div
          className='flex justify-between items-center mt-12'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            {prevSession && (
              <Link href={`/courses/${slug}/${moduleId}/${prevSession._key}`}>
                <Button
                  variant='outline'
                  className='hover:bg-emerald-50 border-emerald-500 text-emerald-600'
                >
                  <ArrowLeft className='mr-2 w-4 h-4' />
                  Previous Session
                </Button>
              </Link>
            )}
          </div>

          <div className='flex items-center gap-4'>
            <Link href={`/courses/${slug}`}>
              <Button variant='outline'>Back to Course</Button>
            </Link>
            {nextSession && (
              <Link href={`/courses/${slug}/${moduleId}/${nextSession._key}`}>
                <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                  Next Session
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
