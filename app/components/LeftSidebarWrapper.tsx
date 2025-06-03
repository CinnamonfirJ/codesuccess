// app/components/LeftSidebarWrapper.tsx (SERVER COMPONENT)
import { getCourses } from "@/sanity/lib/courses/getCourses";
import LeftSidebar from "./left-sidebar";

export default async function LeftSidebarWrapper() {
  const courses = await getCourses();
  return <LeftSidebar courses={courses} />;
}
