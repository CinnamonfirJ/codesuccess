import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import StudySessionContent from "./study-session-content";

interface StudySessionPageProps {
  params: Promise<{
    slug: string;
    moduleId: string;
    sessionKey: string;
  }>;
}

export default async function StudySessionPage({
  params,
}: StudySessionPageProps) {
  const { slug, moduleId, sessionKey } = await params;

  const courses = await getCoursesBySlug(slug);

  if (!courses || Object.keys(courses).length === 0) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-red-50 to-orange-50 min-h-screen'>
        <Card className='mx-4 w-full max-w-md'>
          <CardContent className='p-8 text-center'>
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
            <Link href='/profile/me'>
              <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                <ArrowLeft className='mr-2 w-4 h-4' />
                Back to Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const myModule = courses.modules?.find((m: any) => m._id === moduleId);

  if (!myModule) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-orange-50 to-red-50 min-h-screen'>
        <Card className='mx-4 w-full max-w-md'>
          <CardContent className='p-8 text-center'>
            <div className='flex justify-center items-center bg-orange-100 mx-auto mb-4 rounded-full w-16 h-16'>
              <BookOpen className='w-8 h-8 text-orange-500' />
            </div>
            <h2 className='mb-2 font-bold text-gray-900 text-2xl'>
              Module Not Found
            </h2>
            <p className='mb-6 text-gray-600'>
              The module you&apos;re looking for doesn&apos;t exist in this
              course.
            </p>
            <Link href={`/courses/${slug}`}>
              <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                <ArrowLeft className='mr-2 w-4 h-4' />
                Back to Course
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const session = myModule.studySessions?.find(
    (s: any) => s._key === sessionKey
  );

  if (!session) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-yellow-50 to-orange-50 min-h-screen'>
        <Card className='mx-4 w-full max-w-md'>
          <CardContent className='p-8 text-center'>
            <div className='flex justify-center items-center bg-yellow-100 mx-auto mb-4 rounded-full w-16 h-16'>
              <BookOpen className='w-8 h-8 text-yellow-500' />
            </div>
            <h2 className='mb-2 font-bold text-gray-900 text-2xl'>
              Session Not Found
            </h2>
            <p className='mb-6 text-gray-600'>
              The study session you&apos;re looking for doesn&apos;t exist in
              this module.
            </p>
            <Link href={`/courses/${slug}`}>
              <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                <ArrowLeft className='mr-2 w-4 h-4' />
                Back to Course
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <StudySessionContent
      session={session}
      module={myModule}
      course={courses}
      slug={slug}
      moduleId={moduleId}
      sessionKey={sessionKey}
      className='select-none'
    />
  );
}
