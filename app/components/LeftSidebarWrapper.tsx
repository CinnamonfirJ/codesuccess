// app/components/LeftSidebarWrapper.tsx (SERVER COMPONENT)
import { getCourses } from "@/sanity/lib/courses/getCourses";
import LeftSidebar from "./left-sidebar";

export default async function LeftSidebarWrapper() {
  const courses = await getCourses();
  console.log("Courses fetched for left sidebar:", courses);
  return <LeftSidebar courses={courses ?? []} />;
}
