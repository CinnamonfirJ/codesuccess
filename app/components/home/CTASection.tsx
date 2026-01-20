"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const CTASection = () => {
  return (
    <motion.section
      className='bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-24 text-white text-center'
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className='mx-auto max-w-4xl'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Zap className='mx-auto mb-6 w-16 h-16' />
          <h2 className='mb-6 font-bold text-4xl md:text-6xl'>
            Ready to Transform Your Life?
          </h2>
          <p className='mb-8 text-emerald-100 text-xl md:text-2xl'>
            Join thousands of Nigerian youth who are already building their
            success story.
          </p>

          <div className='flex sm:flex-row flex-col justify-center gap-6 mb-8'>
            <motion.div {...scaleOnHover}>
              <Link href='/homepage'>
                <Button
                  size='lg'
                  className='bg-white hover:bg-gray-100 shadow-xl px-8 py-4 font-semibold text-emerald-600 text-lg'
                >
                  Get Started Free Today
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className='place-content-center gap-6 grid grid-cols-1 md:grid-cols-3 text-emerald-100'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5' />
              <span>Free to start</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5' />
              <span>No credit card required</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5' />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
