import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import { PortableText } from "next-sanity";

interface CourseProps {
  params: Promise<{
    slug: string;
  }>;
}
const Courses = async ({ params }: CourseProps) => {
  const slug = await params;
  const course = await getCoursesBySlug(slug.slug);

  {
    course.map((c) => {
      console.log("Course fetched for slug:", slug.slug, c.modules);

      const myModule = c.modules.map((m) => {
        console.log("Module:", m.studySessions);
        return m;
      });

      myModule.forEach((module) => {
        console.log("Module details:", module);
      });
    });
  }
  if (!course) {
    return <div>Error: Course not found</div>;
  }

  return (
    <div>
      {course.map((courseItem) => (
        <div key={courseItem._id}>
          <h2 className='font-bold text-xl text-center'>{courseItem.title}</h2>
          {courseItem.modules.map((module) => (
            <div key={module._id} className='mb-10'>
              <h3 className='mb-2 font-bold text-xl text-center'>
                {module.title}
              </h3>
              <PortableText
                value={module.description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className='mb-2 font-bold text-xl text-center'>
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <h2 className='mb-2 font-bold text-2xl text-center'>
                        {children}
                      </h2>
                    ),
                  },
                }}
              />

              {module.studySessions && module.studySessions.length > 0 ? (
                module.studySessions.map((session) => (
                  <div
                    key={session._key}
                    className='flex flex-col justify-center items-center shadow mt-4 p-4 border rounded'
                  >
                    <h4 className='font-semibold text-lg'>{session.title}</h4>

                    {/* Quotes */}
                    <div>
                      <ul className='ml-5 italic'>
                        {session.quotes?.map((quote, qIndex) => (
                          <li key={qIndex}>
                            &quot;{quote.text} – {quote.author}&quot;
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Content (Portable Text Rendering if needed) */}
                    <div className='mt-2'>
                      <h5 className='font-medium'>Content:</h5>
                      {/* You need @portabletext/react to render blocks */}
                      {/* <PortableText value={session.content} /> */}
                    </div>

                    {/* Activity */}
                    {/* <div className='mt-2'>
                      <h5 className='font-medium'>
                        Activity: {session.activity?.title}
                      </h5>
                      <ul className='ml-5 list-disc'>
                        {session.activity?.instructions?.map((i, idx) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                      <p>
                        <strong>Reflection:</strong>{" "}
                        {session.activity?.reflectionPrompt}
                      </p>
                    </div> */}

                    {/* Role Play */}
                    {/* <div className='mt-2'>
                      <h5 className='font-medium'>
                        Role Play: {session.rolePlay?.title}
                      </h5>
                      <p>
                        <strong>Scenario:</strong> {session.rolePlay?.scenario}
                      </p>
                      <ul className='ml-5 list-disc'>
                        {session.rolePlay?.instructions?.map((i, idx) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                    </div> */}

                    {/* Summary Box */}
                    {/* <div className='mt-2'>
                      <h5 className='font-medium'>Summary:</h5>
                      <ul className='ml-5 list-disc'>
                        {session.summaryBox?.content?.map((summary, idx) => (
                          <li key={idx}>{summary}</li>
                        ))}
                      </ul>
                    </div> */}

                    {/* Journaling Prompts */}
                    {/* <div className='mt-2'>
                      <h5 className='font-medium'>Journaling Prompts:</h5>
                      <ul className='ml-5 list-disc'>
                        {session.takeawayJournalingPrompts?.map((p, idx) => (
                          <li key={idx}>{p.prompt}</li>
                        ))}
                      </ul>
                    </div> */}
                  </div>
                ))
              ) : (
                <p>No study sessions available.</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Courses;
