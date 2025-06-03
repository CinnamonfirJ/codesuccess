import { GetCoursesQueryResult } from "@/sanity.types";
import Link from "next/link";
import React from "react";

interface CourseLinkProps {
  course: GetCoursesQueryResult[number];
  href: string;
}

export default function CourseLink({ href, course }: CourseLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className='block py-2 hover:text-coral truncate transition-colors'
    >
      {course.title || "Untitled Course"}
    </Link>
  );
}
