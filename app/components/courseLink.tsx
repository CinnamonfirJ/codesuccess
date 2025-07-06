import { GetCoursesQueryResult } from "@/sanity.types";
import Link from "next/link";
import React from "react";

interface CourseLinkProps {
  course: GetCoursesQueryResult[number];
  href: string;
  onClick: () => void;
  locked?: boolean; // <-- Add locked state
}

export default function CourseLink({
  href,
  course,
  onClick,
  locked = false,
}: CourseLinkProps) {
  if (locked) {
    return (
      <span
        className='block py-2 text-gray-400 truncate cursor-not-allowed'
        title='Complete previous module to unlock'
      >
        🔒 {course.title || "Untitled Course"}
      </span>
    );
  }

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
