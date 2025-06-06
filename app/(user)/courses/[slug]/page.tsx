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

  if (!course || Object.keys(course).length === 0) {
    // More robust check for empty object
    return <div>Error: Course not found</div>;
  }

  // To truly see the full data in your terminal console, use JSON.stringify
  // console.log("Course fetched for slug:", slug.slug, course);
  course?.modules.map((module) => {
    console.log(
      "Module:",
      module.title,
      "Study Sessions:",
      module.studySessions
    );
  });

  return (
    <div className='space-y-12 mx-auto p-6 max-w-5xl'>
      <Link
        href={`/profile/me`}
        className='block mb-4 text-blue-600 hover:underline'
      >
        &larr; Back to Course Overview
      </Link>
      <h2 className='font-extrabold text-gray-800 text-3xl text-center'>
        {course.title}
      </h2>

      {course?.modules && course.modules.length > 0 ? ( // Add a check for modules existence and length
        course.modules.map((module) => (
          <div
            key={module._id}
            className='space-y-6 bg-white shadow-md p-6 rounded-lg'
          >
            <h3 className='mb-4 font-bold text-blue-700 text-2xl text-center'>
              {module.title}
            </h3>

            {module.studySessions && module.studySessions.length > 0 ? ( // Add a check for studySessions existence and length
              <div className='space-y-3'>
                <h4 className='font-semibold text-gray-700 text-xl'>
                  Study Sessions:
                </h4>
                <ul className='p-0 list-none'>
                  {module.studySessions
                    // .filter((session) => session !== null) // 🛑 filter nulls
                    .map((session) => (
                      <li
                        key={session._key}
                        className='flex items-center space-x-3 py-2 border-gray-100 border-b last:border-b-0'
                      >
                        <input
                          type='checkbox'
                          id={`session-${session._key}`}
                          className='rounded w-5 h-5 text-indigo-600 form-checkbox'
                        />
                        <label
                          htmlFor={`session-${session._key}`}
                          className='text-gray-800 hover:text-indigo-600 text-lg cursor-pointer'
                        >
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
        ))
      ) : (
        <p className='text-gray-500 text-sm text-center'>
          No modules available for this course.
        </p>
      )}
    </div>
  );
};

export default Courses;
