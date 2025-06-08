"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className='border-gray-100 border-b last:border-b-0'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex justify-between items-center hover:bg-gray-50 p-4 rounded-lg w-full text-left transition-colors'
      >
        <div className='flex items-center gap-3'>
          {icon}
          <span className='font-medium text-gray-900'>{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className='w-5 h-5 text-gray-500' />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className='overflow-hidden'
      >
        <div className='space-y-2 p-4 pt-0 pl-11'>{children}</div>
      </motion.div>
    </div>
  );
};
