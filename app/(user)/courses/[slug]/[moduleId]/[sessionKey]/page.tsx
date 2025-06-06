// app/courses/[slug]/[moduleId]/[sessionKey]/page.tsx

import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug"; // Or a new function to get a single session
import { PortableText } from "next-sanity";
import Link from "next/link"; // For a back button

interface StudySessionPageProps {
  params: {
    slug: string;
    moduleId: string;
    sessionKey: string;
  };
}

const StudySessionPage = async ({ params }: StudySessionPageProps) => {
  const { slug, moduleId, sessionKey } = params;

  // Fetch the course data. You might want to optimize this to fetch only the necessary session data
  // if your Sanity query can support it for individual sessions.
  const courses = await getCoursesBySlug(slug);

  if (!courses || courses.length === 0) {
    return <div>Error: Course not found</div>;
  }

  // const course = courses[0];
  const myModule = courses.modules.find((m: any) => m._id === moduleId);

  if (!module) {
    return <div>Error: Module not found</div>;
  }

  const session = myModule.studySessions.find(
    (s: any) => s._key === sessionKey
  );

  if (!session) {
    return <div>Error: Study session not found</div>;
  }

  return (
    <div className='space-y-8 bg-white shadow-lg mx-auto mt-8 p-6 rounded-lg max-w-4xl'>
      <Link
        href={`/courses/${slug}`}
        className='block mb-4 text-blue-600 hover:underline'
      >
        &larr; Back to Course Overview
      </Link>

      <h2 className='mb-6 font-extrabold text-gray-800 text-3xl text-center'>
        {session.title}
      </h2>

      {/* Quotes */}
      {session.quotes?.length > 0 && (
        <div className='bg-gray-100 p-4 rounded text-gray-700 text-center italic'>
          <h4 className='mb-2 font-semibold text-lg'>Quotes:</h4>
          <ul className='space-y-2'>
            {session.quotes.map((quote: any, idx: number) => (
              <li key={idx}>
                &quot;{quote.text} – {quote.author}&quot;
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <div className='max-w-none text-gray-800 prose'>
        <h3 className='mb-3 font-semibold text-2xl'>Content</h3>
        <PortableText value={session.content} />
      </div>

      {/* Activity */}
      {session.activity && (
        <div className='space-y-2 bg-blue-50 p-4 rounded'>
          <h3 className='font-semibold text-blue-900 text-xl'>Activity</h3>
          <PortableText value={session.activity.title} />
          <ul className='space-y-1 pl-5 text-gray-700 list-disc'>
            {session.activity.instructions?.map((i: any, idx: number) => (
              <li key={idx}>
                <PortableText value={i} />
              </li>
            ))}
          </ul>
          <p className='text-gray-700 text-sm'>
            <strong>Reflection:</strong> {session.activity.reflectionPrompt}
          </p>
        </div>
      )}

      {/* Role Play */}
      {session.rolePlay && (
        <div className='space-y-2 bg-green-50 p-4 rounded'>
          <h3 className='font-semibold text-green-900 text-xl'>Role Play</h3>
          <PortableText value={session.rolePlay.title} />
          <p className='text-gray-700 text-sm'>
            <strong>Scenario:</strong>{" "}
            <PortableText value={session.rolePlay.scenario} />
          </p>
          <ul className='space-y-1 pl-5 text-gray-700 list-disc'>
            {session.rolePlay.instructions?.map((i: any, idx: number) => (
              <li key={idx}>
                <PortableText value={i} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      {session.summaryBox?.content?.length > 0 && (
        <div className='space-y-2 bg-yellow-50 p-4 rounded'>
          <h3 className='font-semibold text-yellow-800 text-xl'>Summary</h3>
          <ul className='space-y-1 pl-5 text-gray-700 list-disc'>
            {session.summaryBox.content.map((summary: any, idx: number) => (
              <li key={idx}>
                <PortableText value={summary} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Journaling Prompts */}
      {session.takeawayJournalingPrompts?.length > 0 && (
        <div className='space-y-2 bg-purple-50 p-4 rounded'>
          <h3 className='font-semibold text-purple-800 text-xl'>
            Journaling Prompts
          </h3>
          <ul className='space-y-1 pl-5 text-gray-700 list-disc'>
            {session.takeawayJournalingPrompts.map((p: any, idx: number) => (
              <li key={idx}>{p.prompt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudySessionPage;
