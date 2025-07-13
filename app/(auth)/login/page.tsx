"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      toast.success("Login successful!");
      router.push("/homepage");
    } else {
      toast.error("Login failed. Please check your credentials.");
      setIsLoading(false);
    }
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
          <CardHeader className='bg-gradient-to-r from-emerald-500 to-blue-500 p-8 text-white text-center'>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className='flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16'>
                <Lock className='w-8 h-8' />
              </div>
              <h1 className='mb-2 font-bold text-3xl'>Welcome Back!</h1>
              <p className='text-emerald-100'>
                Sign in to continue your journey
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
                    placeholder='Enter your email'
                    className='pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 h-12'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Label htmlFor='password' className='font-medium text-gray-700'>
                  Password
                </Label>
                <div className='relative mt-2'>
                  <Lock className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    className='pr-10 pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 h-12'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                className='flex justify-between items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='border-gray-300 rounded focus:ring-emerald-500 text-emerald-500'
                  />
                  <span className='ml-2 text-gray-600 text-sm'>
                    Remember me
                  </span>
                </label>
                <Link
                  href='/reset-password'
                  className='text-emerald-600 hover:text-emerald-700 text-sm'
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div {...scaleOnHover}>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-lg w-full h-12 font-semibold text-white text-lg'
                >
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <div className='border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin'></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      Sign In
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
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className='relative'>
                <Separator />
                <div className='absolute inset-0 flex justify-center'>
                  <span className='bg-white px-4 text-gray-500 text-sm'>
                    Or continue with
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
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className='text-gray-600'>
                Don&apos;t have an account?{" "}
                <Link
                  href='/signup'
                  className='font-medium text-emerald-600 hover:text-emerald-700'
                >
                  Sign up for free
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
