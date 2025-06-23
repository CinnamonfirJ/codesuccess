"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Sparkles,
} from "lucide-react";
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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Redirect to onboarding or dashboard
    window.location.href = "/onboarding";
  };

  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6 min-h-screen'>
      <motion.div
        className='w-full max-w-md'
        variants={fadeInUp}
        initial='initial'
        animate='animate'
      >
        <Card className='bg-white shadow-2xl border-0 overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white text-center'>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className='flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16'>
                <Sparkles className='w-8 h-8' />
              </div>
              <h1 className='mb-2 font-bold text-3xl'>Start Your Journey!</h1>
              <p className='text-purple-100'>
                Join thousands of Nigerian youth rising to success
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className='p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='gap-4 grid grid-cols-2'>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Label
                    htmlFor='firstName'
                    className='font-medium text-gray-700'
                  >
                    First Name
                  </Label>
                  <div className='relative mt-2'>
                    <User className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                    <Input
                      id='firstName'
                      type='text'
                      placeholder='First name'
                      className='pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-12'
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Label
                    htmlFor='lastName'
                    className='font-medium text-gray-700'
                  >
                    Last Name
                  </Label>
                  <div className='relative mt-2'>
                    <User className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                    <Input
                      id='lastName'
                      type='text'
                      placeholder='Last name'
                      className='pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-12'
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Label htmlFor='email' className='font-medium text-gray-700'>
                  Email Address
                </Label>
                <div className='relative mt-2'>
                  <Mail className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    className='pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-12'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Label htmlFor='password' className='font-medium text-gray-700'>
                  Password
                </Label>
                <div className='relative mt-2'>
                  <Lock className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Create a strong password'
                    className='pr-10 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-12'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform'
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Label
                  htmlFor='confirmPassword'
                  className='font-medium text-gray-700'
                >
                  Confirm Password
                </Label>
                <div className='relative mt-2'>
                  <Lock className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm your password'
                    className='pr-10 pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-12'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                className='flex items-start space-x-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Checkbox
                  id='terms'
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      agreeToTerms: checked as boolean,
                    })
                  }
                  className='mt-1'
                />
                <label
                  htmlFor='terms'
                  className='text-gray-600 text-sm leading-relaxed'
                >
                  I agree to the{" "}
                  <Link
                    href='/terms'
                    className='text-purple-600 hover:text-purple-700'
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href='/privacy'
                    className='text-purple-600 hover:text-purple-700'
                  >
                    Privacy Policy
                  </Link>
                </label>
              </motion.div>

              <motion.div {...scaleOnHover}>
                <Button
                  type='submit'
                  disabled={isLoading || !formData.agreeToTerms}
                  className='bg-gradient-to-r from-purple-500 hover:from-purple-600 to-pink-500 hover:to-pink-600 disabled:opacity-50 shadow-lg w-full h-12 font-semibold text-white text-lg'
                >
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <div className='border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin'></div>
                      Creating account...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      Create Account
                      <ArrowRight className='w-5 h-5' />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className='mt-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className='relative'>
                <Separator />
                <div className='absolute inset-0 flex justify-center'>
                  <span className='bg-white px-4 text-gray-500 text-sm'>
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className='gap-4 grid grid-cols-2 mt-6'>
                <Button
                  variant='outline'
                  className='hover:bg-gray-50 border-gray-200 h-12'
                >
                  <Github className='mr-2 w-5 h-5' />
                  GitHub
                </Button>
                <Button
                  variant='outline'
                  className='hover:bg-gray-50 border-gray-200 h-12'
                >
                  <Chrome className='mr-2 w-5 h-5' />
                  Google
                </Button>
              </div>
            </motion.div>

            <motion.div
              className='mt-8 text-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <p className='text-gray-600'>
                Already have an account?{" "}
                <Link
                  href='/login'
                  className='font-medium text-purple-600 hover:text-purple-700'
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
