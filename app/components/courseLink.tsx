import { GetCoursesQueryResult } from "@/sanity.types";
import Link from "next/link";
import React from "react";

interface CourseLinkProps {
  course: GetCoursesQueryResult[number];
  href: string;
  onClick: () => void;
}

export default function CourseLink({ href, course, onClick }: CourseLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onClick}
      className='block py-2 hover:text-coral truncate transition-colors'
    >
      {course.title || "Untitled Course"}
    </Link>
  );
}
