"use client";

import { motion } from "framer-motion";
import { Hourglass, Sparkles } from "lucide-react";

export default function ComingSoon() {
  return (
    <motion.div
      className='flex flex-col justify-center items-center bg-gradient-to-br from-white via-slate-50 to-emerald-50 shadow-inner px-4 py-20 border rounded-xl text-center'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='flex items-center gap-4 mb-4 text-emerald-600'>
        <Sparkles className='w-6 h-6 animate-pulse' />
        <Hourglass className='w-6 h-6 animate-spin-slow' />
        <Sparkles className='w-6 h-6 animate-pulse' />
      </div>
      <h2 className='mb-2 font-bold text-gray-800 text-2xl'>
        Feeds Coming Soon!
      </h2>
      <p className='max-w-md text-gray-600'>
        Our team is cooking up something amazing. Soon, you’ll be able to
        explore inspiring stories, affirmations, and progress from learners like
        you.
      </p>
    </motion.div>
  );
}
