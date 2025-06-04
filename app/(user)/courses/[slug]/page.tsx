// import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
// import { PortableText } from "next-sanity";

// interface CourseProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }
// const Courses = async ({ params }: CourseProps) => {
//   const slug = await params;
//   const course = await getCoursesBySlug(slug.slug);

//   {
//     course.map((c) => {
//       console.log("Course fetched for slug:", slug.slug, c.modules);

//       const myModule = c.modules.map((m) => {
//         console.log("Module:", m.studySessions);
//         return m;
//       });

//       myModule.forEach((module) => {
//         console.log("Module details:", module);
//       });
//     });
//   }
//   if (!course) {
//     return <div>Error: Course not found</div>;
//   }

//   return (
//     <div className='space-y-12 mx-auto p-6 max-w-5xl'>
//       {course.map((courseItem) => (
//         <div key={courseItem._id} className='space-y-8'>
//           <h2 className='font-extrabold text-gray-800 text-3xl text-center'>
//             {courseItem.title}
//           </h2>

//           {courseItem.modules.map((module) => (
//             <div key={module._id} className='space-y-6'>
//               <h3 className='font-bold text-blue-700 text-2xl text-center'>
//                 {module.title}
//               </h3>

//               <div className='text-gray-700 text-center'>
//                 <PortableText
//                   value={module.description}
//                   components={{
//                     block: {
//                       normal: ({ children }) => (
//                         <p className='mb-2 text-lg'>{children}</p>
//                       ),
//                       h2: ({ children }) => (
//                         <h2 className='mb-2 font-semibold text-xl'>
//                           {children}
//                         </h2>
//                       ),
//                     },
//                   }}
//                 />
//               </div>

//               {/* Study Sessions */}
//               {module.studySessions?.length > 0 ? (
//                 <div className='space-y-6'>
//                   {module.studySessions.map((session) => (
//                     <div
//                       key={session._key}
//                       className='space-y-6 bg-white shadow-sm p-6 border border-gray-200 rounded-lg'
//                     >
//                       <h4 className='font-semibold text-indigo-600 text-xl text-center'>
//                         {session.title}
//                       </h4>

//                       {/* Quotes */}
//                       {session.quotes?.length > 0 && (
//                         <div className='bg-gray-100 p-4 rounded'>
//                           <ul className='space-y-2 text-gray-600 text-sm text-center italic'>
//                             {session.quotes.map((quote, idx) => (
//                               <li key={idx}>
//                                 &quot;{quote.text} – {quote.author}&quot;
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Content */}
//                       <div>
//                         <h5 className='mb-1 font-semibold text-gray-800'>
//                           Content:
//                         </h5>
//                         <div className='max-w-none prose'>
//                           <PortableText value={session.content} />
//                         </div>
//                       </div>

//                       {/* Activity */}
//                       <div className='space-y-2 bg-blue-50 p-4 rounded'>
//                         <h5 className='font-semibold text-blue-900'>
//                           Activity
//                         </h5>
//                         <PortableText value={session.activity?.title} />
//                         <ul className='space-y-1 pl-5 list-disc'>
//                           {session.activity?.instructions?.map((i, idx) => (
//                             <li key={idx}>
//                               <PortableText value={i} />
//                             </li>
//                           ))}
//                         </ul>
//                         <p className='text-sm'>
//                           <strong>Reflection:</strong>{" "}
//                           {session.activity?.reflectionPrompt}
//                         </p>
//                       </div>

//                       {/* Role Play */}
//                       <div className='space-y-2 bg-green-50 p-4 rounded'>
//                         <h5 className='font-semibold text-green-900'>
//                           Role Play
//                         </h5>
//                         <PortableText value={session.rolePlay?.title} />
//                         <p className='text-sm'>
//                           <strong>Scenario:</strong>{" "}
//                           <PortableText value={session.rolePlay?.scenario} />
//                         </p>
//                         <ul className='space-y-1 pl-5 list-disc'>
//                           {session.rolePlay?.instructions?.map((i, idx) => (
//                             <li key={idx}>
//                               <PortableText value={i} />
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Summary */}
//                       {session.summaryBox?.content?.length > 0 && (
//                         <div className='space-y-2 bg-yellow-50 p-4 rounded'>
//                           <h5 className='font-semibold text-yellow-800'>
//                             Summary
//                           </h5>
//                           <ul className='space-y-1 pl-5 list-disc'>
//                             {session.summaryBox.content.map((summary, idx) => (
//                               <li key={idx}>
//                                 <PortableText value={summary} />
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Journaling Prompts */}
//                       {session.takeawayJournalingPrompts?.length > 0 && (
//                         <div className='space-y-2 bg-purple-50 p-4 rounded'>
//                           <h5 className='font-semibold text-purple-800'>
//                             Journaling Prompts
//                           </h5>
//                           <ul className='space-y-1 pl-5 text-gray-700 text-sm list-disc'>
//                             {session.takeawayJournalingPrompts.map((p, idx) => (
//                               <li key={idx}>{p.prompt}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className='text-gray-500 text-sm text-center'>
//                   No study sessions available.
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Courses;
import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import Link from "next/link"; // Import Link for navigation

interface CourseProps {
  params: Promise<{
    slug: string;
  }>;
}

const Courses = async ({ params }: CourseProps) => {
  const slug = await params;
  const course = await getCoursesBySlug(slug.slug);

  if (!course || course.length === 0) {
    // Check for empty array too
    return <div>Error: Course not found</div>;
  }

  // Assuming you want to display the first course found for the slug
  const courseItem = course[0];

  console.log("Course fetched for slug:", slug.slug, courseItem);

  return (
    <div className='space-y-12 mx-auto p-6 max-w-5xl'>
      <h2 className='font-extrabold text-gray-800 text-3xl text-center'>
        {courseItem.title}
      </h2>

      {courseItem?.modules.map((module) => (
        <div
          key={module._id}
          className='space-y-6 bg-white shadow-md p-6 rounded-lg'
        >
          <h3 className='mb-4 font-bold text-blue-700 text-2xl text-center'>
            {module.title}
          </h3>

          {/* Display Study Sessions as Links or Checkboxes */}
          {module.studySessions?.length > 0 ? (
            <div className='space-y-3'>
              <h4 className='font-semibold text-gray-700 text-xl'>
                Study Sessions:
              </h4>
              <ul className='p-0 list-none'>
                {module.studySessions.map((session) => (
                  <li
                    key={session._key}
                    className='flex items-center space-x-3 py-2 border-gray-100 border-b last:border-b-0'
                  >
                    {/* Option 1: Checkbox */}
                    <input
                      type='checkbox'
                      id={`session-${session._key}`}
                      className='rounded w-5 h-5 text-indigo-600 form-checkbox'
                    />
                    {/* Option 2: Link to individual study session page */}
                    <label
                      htmlFor={`session-${session._key}`}
                      className='text-gray-800 hover:text-indigo-600 text-lg cursor-pointer'
                    >
                      {/*
                        IMPORTANT: You'll need to define how to generate a unique slug for each study session.
                        If your Sanity schema for study sessions doesn't have a 'slug' field, you might need to add one.
                        For now, I'm using a placeholder like '/study-session/[courseSlug]/[moduleID]/[sessionKey]'.
                        You might want to use a more user-friendly slug based on the session title.
                      */}
                      <Link
                        href={`/courses/${slug.slug}/${module._id}/${session._key}`}
                      >
                        {session.title}
                      </Link>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className='text-gray-500 text-sm text-center'>
              No study sessions available for this module.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Courses;
