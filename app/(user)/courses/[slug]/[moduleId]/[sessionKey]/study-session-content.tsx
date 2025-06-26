"use client";

import { PortableText } from "next-sanity";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  Quote,
  Activity,
  Users,
  Lightbulb,
  PenTool,
  Target,
  PlayCircle,
  Brain,
  User,
  AlertTriangle,
  Clock3,
  Mail,
  BookOpen,
  AlertCircle,
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

export default function StudySessionContent({
  session,
  module,
  course,
  slug,
  moduleId,
  sessionKey,
}: StudySessionContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  // Find current session index and navigation
  const currentSessionIndex =
    module.studySessions?.findIndex((s: any) => s._key === sessionKey) || 0;
  const nextSession = module.studySessions?.[currentSessionIndex + 1];
  const prevSession = module.studySessions?.[currentSessionIndex - 1];

  // Debug: Log all the data
  console.log("Session data:", session);
  console.log("Module data:", module);
  console.log("Course data:", course);
  console.log("All sessions:", module.studySessions);

  // Check if session data is properly loaded
  const isSessionEmpty =
    !session ||
    Object.values(session).every(
      (value) => value === null || value === undefined
    );

  // Check if we have new structured content or old content
  const hasStructuredContent =
    session?.conceptDefinition ||
    session?.whyItMatters ||
    session?.whatThisMeansForYou ||
    session?.commonMisconceptions ||
    session?.realLifeExample ||
    session?.whyTimeToActIsNow ||
    session?.openLetterToYou;

  const hasLegacyContent = session?.content && session.content.length > 0;

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
  };

  // If session is completely empty, show data issue warning
  if (isSessionEmpty || !session?.title) {
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
            <Link
              href={`/courses/${slug}`}
              className='group inline-flex items-center mb-6 font-medium text-emerald-600 hover:text-emerald-700 transition-colors'
            >
              <ArrowLeft className='mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1' />
              Back to Course
            </Link>

            {/* Data Issue Warning */}
            <Card className='bg-red-50 shadow-lg border-red-200'>
              <CardContent className='p-8 text-center'>
                <div className='flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16'>
                  <AlertCircle className='w-8 h-8 text-red-600' />
                </div>
                <h3 className='mb-4 font-semibold text-red-800 text-xl'>
                  Session Data Issue
                </h3>
                <div className='bg-white mb-4 p-4 rounded-lg text-left'>
                  <p className='mb-2 text-red-700'>
                    <strong>Session Key:</strong> {sessionKey}
                  </p>
                  <p className='mb-2 text-red-700'>
                    <strong>Module ID:</strong> {moduleId}
                  </p>
                  <p className='mb-2 text-red-700'>
                    <strong>Issue:</strong> Session data is not properly
                    configured in Sanity CMS
                  </p>
                </div>
                <div className='space-y-2 text-red-700 text-sm'>
                  <p>
                    <strong>Possible solutions:</strong>
                  </p>
                  <ul className='space-y-1 text-left'>
                    <li>
                      • Check if the study session exists in Sanity Studio
                    </li>
                    <li>• Verify the session has a title and content</li>
                    <li>
                      • Ensure the session is properly linked to the module
                    </li>
                    <li>• Check if the session document is published</li>
                  </ul>
                </div>
                <div className='flex justify-center gap-4 mt-6'>
                  <Link href={`/courses/${slug}`}>
                    <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                      Back to Course
                    </Button>
                  </Link>
                  <Button
                    variant='outline'
                    onClick={() => window.location.reload()}
                    className='hover:bg-red-50 border-red-300 text-red-600'
                  >
                    Retry Loading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Content sections configuration for new structured content
  const contentSections = [
    {
      key: "conceptDefinition",
      title: "Concept Definition and Explanations",
      icon: Brain,
      content: session.conceptDefinition,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
    },
    {
      key: "whyItMatters",
      title: "Why it Matters",
      icon: Target,
      content: session.whyItMatters,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
    },
    {
      key: "whatThisMeansForYou",
      title: "What this means for You",
      icon: User,
      content: session.whatThisMeansForYou,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
    },
    {
      key: "commonMisconceptions",
      title: "Common Misconceptions",
      icon: AlertTriangle,
      content: session.commonMisconceptions,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200",
    },
    {
      key: "realLifeExample",
      title: "Real-life Example",
      icon: Lightbulb,
      content: session.realLifeExample,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
    },
    {
      key: "whyTimeToActIsNow",
      title: "Why the Time to Act is Now",
      icon: Clock3,
      content: session.whyTimeToActIsNow,
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
    },
    {
      key: "openLetterToYou",
      title: "Open Letter to You",
      icon: Mail,
      content: session.openLetterToYou,
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
    },
  ];

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
                      {course?.title} • {module?.title}
                    </div>
                  </div>
                  <h1 className='mb-4 font-bold text-lg md:text-3xl lg:text-4xl leading-tight'>
                    {session?.title || "Study Session"}
                  </h1>
                  <div className='flex items-center gap-3 md:gap-6 text-emerald-100 text-nowrap'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' />
                      <span>5 min read</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Target className='w-4 h-4' />
                      <span>Learning Session</span>
                    </div>
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

          {/* Structured Content Sections (New Format) */}
          {hasStructuredContent &&
            contentSections.map((section) => {
              if (!section.content || section.content.length === 0) return null;

              return (
                <motion.div key={section.key} variants={fadeInUp}>
                  <Card
                    className={`bg-gradient-to-br ${section.bgGradient} shadow-lg ${section.borderColor}`}
                  >
                    <CardContent className='p-2 md:p-8'>
                      <div className='flex items-center gap-3 mb-6'>
                        <div
                          className={`flex justify-center items-center bg-gradient-to-r ${section.gradient} rounded-xl w-10 h-10`}
                        >
                          <section.icon className='w-5 h-5 text-white' />
                        </div>
                        <h3 className='font-bold text-gray-900 text-lg md:text-2xl'>
                          {section.title}
                        </h3>
                      </div>
                      <div className='bg-white/70 p-6 border border-gray-100 rounded-xl'>
                        <div className='max-w-none text-gray-800 leading-relaxed prose prose-lg'>
                          <PortableText value={section.content} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

          {/* Legacy Content Section (Old Format) */}
          {!hasStructuredContent && hasLegacyContent && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardContent className='p-2 md:p-8'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl w-10 h-10'>
                      <BookOpen className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='font-bold text-gray-900 text-2xl'>
                      Content
                    </h3>
                  </div>
                  <div className='max-w-none text-gray-800 leading-relaxed prose prose-lg'>
                    <PortableText value={session.content} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* No Content Warning */}
          {!hasStructuredContent && !hasLegacyContent && (
            <motion.div variants={fadeInUp}>
              <Card className='bg-yellow-50 shadow-lg border-yellow-200'>
                <CardContent className='p-8 text-center'>
                  <div className='flex justify-center items-center bg-yellow-100 mx-auto mb-4 rounded-full w-16 h-16'>
                    <BookOpen className='w-8 h-8 text-yellow-600' />
                  </div>
                  <h3 className='mb-2 font-semibold text-yellow-800 text-xl'>
                    Content Coming Soon
                  </h3>
                  <p className='mb-4 text-yellow-700'>
                    This study session is being prepared. Please check back
                    later for the complete content.
                  </p>
                  <div className='bg-yellow-100 p-3 rounded-lg text-yellow-600 text-sm'>
                    <p>
                      <strong>For developers:</strong> Add content to this
                      session in Sanity Studio
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

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
                          Questions For Reflection
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
                    {session.rolePlay.variation && (
                      <div className='bg-green-100 p-6 border border-green-200 rounded-xl'>
                        <h4 className='mb-4 font-semibold text-green-900'>
                          Variation:
                        </h4>
                        <ul className='space-y-3'>
                          {session.rolePlay.variation.map(
                            (variation: any, idx: number) => (
                              <li key={idx} className='flex items-start gap-3'>
                                <div className='flex justify-center items-center bg-green-500 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-sm'>
                                  {idx + 1}
                                </div>
                                <div className='flex-1 prose prose-sm'>
                                  <PortableText value={variation} />
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    {session.rolePlay.reflectionPrompt && (
                      <div className='bg-white/70 p-6 border border-green-100 rounded-xl'>
                        <h4 className='mb-3 font-semibold text-green-900'>
                          Reflection Prompt:
                        </h4>
                        <div className='prose prose-sm'>
                          <PortableText
                            value={session.rolePlay.reflectionPrompt}
                          />
                        </div>
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
                      Takeaway Journaling Prompts
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
                  <span className='hidden md:flex'>Previous Session</span>
                </Button>
              </Link>
            )}
          </div>

          <Link href={`/courses/${slug}`}>
            <Button variant='outline'>Back to Course</Button>
          </Link>
          <div className='flex items-center gap-4'>
            {nextSession && (
              <Link href={`/courses/${slug}/${moduleId}/${nextSession._key}`}>
                <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                  <span className='hidden md:flex'>Next Session</span>
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
