"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsEmailSent(true);
  };

  if (isEmailSent) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6 min-h-screen'>
        <motion.div
          className='w-full max-w-md'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <Card className='bg-white shadow-2xl border-0 overflow-hidden'>
            <CardHeader className='bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white text-center'>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className='flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16'>
                  <CheckCircle className='w-8 h-8' />
                </div>
                <h1 className='mb-2 font-bold text-3xl'>Check Your Email!</h1>
                <p className='text-green-100'>
                  We&apos;ve sent you a password reset link
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className='p-8 text-center'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className='mb-6 text-gray-600 leading-relaxed'>
                  We&apos;ve sent a password reset link to{" "}
                  <strong>{email}</strong>. Click the link in the email to reset
                  your password.
                </p>

                <div className='space-y-4'>
                  <Button
                    onClick={() => setIsEmailSent(false)}
                    variant='outline'
                    className='hover:bg-gray-50 border-gray-200 w-full h-12'
                  >
                    Try Different Email
                  </Button>

                  <Link href='/auth/login'>
                    <Button className='bg-gradient-to-r from-green-500 hover:from-green-600 to-emerald-500 hover:to-emerald-600 w-full h-12 text-white'>
                      <ArrowLeft className='mr-2 w-5 h-5' />
                      Back to Login
                    </Button>
                  </Link>
                </div>

                <p className='mt-6 text-gray-500 text-sm'>
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className='font-medium text-green-600 hover:text-green-700'
                  >
                    try again
                  </button>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6 min-h-screen'>
      <motion.div
        className='w-full max-w-md'
        variants={fadeInUp}
        initial='initial'
        animate='animate'
      >
        <Card className='bg-white shadow-2xl border-0 overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white text-center'>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className='flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16'>
                <Mail className='w-8 h-8' />
              </div>
              <h1 className='mb-2 font-bold text-3xl'>Reset Password</h1>
              <p className='text-orange-100'>
                Enter your email to receive a reset link
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className='p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Label htmlFor='email' className='font-medium text-gray-700'>
                  Email Address
                </Label>
                <div className='relative mt-2'>
                  <Mail className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email address'
                    className='pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 h-12'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <p className='mt-2 text-gray-500 text-sm'>
                  We&apos;ll send you a link to reset your password securely.
                </p>
              </motion.div>

              <motion.div {...scaleOnHover}>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='bg-gradient-to-r from-orange-500 hover:from-orange-600 to-red-500 hover:to-red-600 shadow-lg w-full h-12 font-semibold text-white text-lg'
                >
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <div className='border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin'></div>
                      Sending reset link...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      Send Reset Link
                      <ArrowRight className='w-5 h-5' />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className='mt-8 text-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href='/login'
                className='inline-flex items-center font-medium text-gray-600 hover:text-gray-800'
              >
                <ArrowLeft className='mr-2 w-4 h-4' />
                Back to Login
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
