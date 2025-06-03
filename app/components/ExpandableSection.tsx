"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ExpandableSection = ({
  title,
  children,
  icon,
}: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='border-gray-200 border-b last:border-b-0'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex justify-between items-center hover:bg-teal-50 p-4 w-full text-left transition-colors'
      >
        <div className='flex items-center gap-3'>
          {icon}
          <span className='font-medium'>{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className='w-5 h-5 text-gray-500' />
        ) : (
          <ChevronDown className='w-5 h-5 text-gray-500' />
        )}
      </button>
      {isExpanded && (
        <div className='space-y-2 p-4 pt-0 pl-11 text-sm animate-slideDown'>
          {children}
        </div>
      )}
    </div>
  );
};
