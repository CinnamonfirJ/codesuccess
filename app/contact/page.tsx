"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // Normally, you'd send the data to your backend/API here
  };

  return (
    <main className='bg-gradient-to-br from-white to-blue-50 px-6 py-24 min-h-screen'>
      <motion.div
        className='mx-auto max-w-3xl'
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge className='bg-emerald-100 mb-6 px-4 py-2 text-emerald-700'>
          Contact Us
        </Badge>

        <h1 className='mb-4 font-bold text-gray-900 text-4xl md:text-5xl'>
          Let’s Talk
        </h1>
        <p className='mb-12 text-gray-600 text-lg'>
          Have a question, suggestion, or need help? Fill out the form below and
          we’ll get back to you as soon as possible.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className='space-y-6 bg-white shadow-xl p-8 rounded-2xl'
          >
            <div>
              <label className='block mb-2 font-semibold text-gray-700'>
                Name
              </label>
              <div className='relative'>
                <User className='top-3 left-3 absolute w-5 h-5 text-gray-400' />
                <input
                  required
                  type='text'
                  placeholder='Your full name'
                  className='py-3 pr-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full'
                />
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold text-gray-700'>
                Email
              </label>
              <div className='relative'>
                <Mail className='top-3 left-3 absolute w-5 h-5 text-gray-400' />
                <input
                  required
                  type='email'
                  placeholder='you@example.com'
                  className='py-3 pr-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                />
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold text-gray-700'>
                Message
              </label>
              <div className='relative'>
                <MessageSquare className='top-3 left-3 absolute w-5 h-5 text-gray-400' />
                <textarea
                  required
                  rows={5}
                  placeholder='Write your message here...'
                  className='py-3 pr-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full resize-none'
                ></textarea>
              </div>
            </div>

            <Button
              type='submit'
              className='flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-lg px-6 py-3 w-full font-semibold text-white text-lg'
            >
              Send Message <Send className='w-5 h-5' />
            </Button>
          </form>
        ) : (
          <div className='bg-emerald-50 shadow-lg p-8 rounded-xl text-emerald-700 text-center'>
            <h2 className='mb-2 font-bold text-3xl'>Thank You! 🎉</h2>
            <p className='text-lg'>
              We’ve received your message and will respond shortly.
            </p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
