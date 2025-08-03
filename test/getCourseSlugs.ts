import { getCourses } from "../sanity/lib/courses/getCourses";

async function getAllCourseSlugs() {
  try {
    const courses = await getCourses();

    if (courses && Array.isArray(courses)) {
      // const slugs = courses.map((course) => course.slug);

      console.log("Slugs of all courses:");
      // console.log(JSON.stringify(slugs, null, 2));
    } else {
      console.log(
        "No course data found or unexpected data format from getCourses."
      );
      console.log(
        "Raw result from getCourses:",
        JSON.stringify(courses, null, 2)
      );
    }
  } catch (error) {
    console.error("Error fetching course slugs:", error);
  }
}

getAllCourseSlugs();
