"use client";

import type React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function VerifyEmailPage() {
  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6 min-h-screen'>
      <motion.div
        className='w-full max-w-md'
        variants={fadeInUp}
        initial='initial'
        animate='animate'
      >
        <Card className='bg-white shadow-2xl border-0 overflow-hidden text-center'>
          <CardHeader className='bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white'>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className='flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16'>
                <Mail className='w-8 h-8' />
              </div>
              <h1 className='mb-2 font-bold text-3xl'>Verify Your Email</h1>
              <p className='text-purple-100'>
                One last step to join the community!
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className='p-8'>
            <div className='space-y-6'>
              <p className='text-gray-600 text-sm leading-relaxed'>
                We&apos;ve sent a verification link to your email address.
                Please click the link in the email to activate your account and
                start your journey.
              </p>
              <p className='text-gray-600 text-sm leading-relaxed'>
                If you don&apos;t see the email, please check your spam folder.
              </p>
            </div>

            <motion.div {...scaleOnHover} className='mt-8'>
              <Link href='/login'>
                <Button
                  type='button'
                  className='bg-gradient-to-r from-purple-500 hover:from-purple-600 to-pink-500 hover:to-pink-600 shadow-lg w-full h-12 font-semibold text-white text-lg'
                >
                  <div className='flex items-center gap-2'>
                    Back to Login
                    <ArrowRight className='w-5 h-5' />
                  </div>
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
