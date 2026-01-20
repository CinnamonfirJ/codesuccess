"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const HeroSection = () => {
  return (
    <section className='relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-6 py-24 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='z-10 relative'
      >
        {/* Brand Name and Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='flex justify-center items-center mb-8'
        >
          <Image
            src='/logo.png'
            alt='codesuccex logo'
            className='mr-4 w-20 h-20'
            width={80}
            height={80}
          />
          <span className='font-bold text-gray-900 text-3xl md:text-6xl leading-none'>
            CodeSuccex
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Badge className='bg-gradient-to-r from-emerald-500 to-blue-500 mb-6 px-2 md:px-4 py-2 font-medium text-white text-xs md:text-sm'>
            🚀 150,000,000+ Success is Calling
          </Badge>
        </motion.div>

        <motion.h1
          className='z-10 bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 mx-auto max-w-5xl font-bold text-transparent text-3xl md:text-7xl leading-tight'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Unlock Your Potential.
          <br />
          <span className='text-emerald-600'>Rise & Win.</span>
        </motion.h1>

        <motion.div
          className='mx-auto mt-10 px-4 max-w-4xl text-gray-800'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className='mb-6 font-semibold text-2xl md:text-3xl text-center leading-snug'>
            Welcome to{" "}
            <span className='font-bold text-primary'>CodeSuccex</span> — Where
            Success Meets Inspiration!
          </p>
          <p className='mb-6 text-lg md:text-xl md:text-left text-center leading-relaxed'>
            You&apos;ve just joined a powerful space built for dreamers, doers,
            and everyday people who want more out of life. Here, you&apos;ll
            find free courses, uplifting content, mentorship from industry
            experts, and a supportive community that believes in your potential.
          </p>
          <ul className='space-y-2 mb-6 pl-2 md:pl-0 text-lg md:text-xl text-left list-none'>
            <li>
              <span className='ml-2'>Learn</span>
            </li>
            <li>
              <span className='ml-2'>Connect</span>
            </li>
            <li>
              <span className='ml-2'>Grow</span>
            </li>
          </ul>
          <p className='text-lg md:text-xl md:text-left text-center leading-relaxed'>
            You&apos;re not just a member — you&apos;re part of a movement.{" "}
            <strong>Let&apos;s rise together!</strong>
          </p>
        </motion.div>

        <motion.div
          className='flex sm:flex-row flex-col justify-center gap-6 mt-12'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.div {...scaleOnHover}>
            <Link href='/homepage'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-xl px-8 py-4 font-semibold text-white text-lg'
              >
                Start Your Journey Free
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            </Link>
          </motion.div>
          <motion.div {...scaleOnHover}>
            <Button
              variant='outline'
              size='lg'
              className='hover:bg-emerald-50 px-8 py-4 border-2 border-emerald-500 font-semibold text-emerald-600 text-lg'
            >
              Watch Success Stories
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className='flex justify-center items-center gap-2 mt-12 text-gray-600 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className='flex -space-x-2'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className='bg-gradient-to-r from-emerald-400 to-blue-400 border-2 border-white rounded-full w-8 h-8'
              ></div>
            ))}
          </div>
          <span className='ml-3'>
            Join thousands of successful Nigerian youth
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
