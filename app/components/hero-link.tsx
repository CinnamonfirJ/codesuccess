"use client";

import Link from "next/link";

interface Hero {
  _id: string;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  name?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  areaOfExcellence?: string | null;
  adversities?: string[] | null;
  overcomingChallenges?: string | null;
}

interface HeroLinkProps {
  hero: Hero;
  href: string;
  onClick?: () => void;
}

export default function HeroLink({ hero, href, onClick }: HeroLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='group flex items-center gap-3 hover:bg-yellow-50 p-3 rounded-lg transition-colors'
    >
      <div className='bg-yellow-400 rounded-full w-2 h-2'></div>
      <div className='flex-1 min-w-0'>
        <span className='block font-medium text-gray-700 group-hover:text-yellow-600 text-sm truncate'>
          {hero.name || "Unknown Hero"}
        </span>
        {hero.areaOfExcellence && (
          <span className='block text-gray-500 text-xs truncate'>
            {hero.areaOfExcellence}
          </span>
        )}
      </div>
    </Link>
  );
}
