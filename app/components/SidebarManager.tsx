import { getCourses } from "@/sanity/lib/courses/getCourses";
import NavbarWrapper from "./NavbarWrapper";
import SanityLiveWrapper from "./SanityLiveWrapper";

export default async function SidebarManager() {
  const courses = await getCourses();

  return (
    <div>
      <NavbarWrapper courses={courses ?? []} />
      <SanityLiveWrapper />
    </div>
  );
}
