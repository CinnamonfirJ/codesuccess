// // import { Menu, User } from "lucide-react";
// import { Inter } from "next/font/google";

// import LeftSidebar from "../components/left-sidebar";
// import RightSidebar from "../components/right-sidebar";
// import Feed from "../components/feed";
// import { getCourses } from "@/sanity/lib/courses/getCourses";

// const inter = Inter({ subsets: ["latin"] });

// export default async function Home() {
//   const courses = await getCourses();
//   return (
//     <main className={`container mx-auto bg-background ${inter.className}`}>
//       {/* Desktop Layout */}
//       <div className='flex md:flex-row flex-col'>
//         {/* Left Sidebar - Hidden on mobile */}
//         <div className='hidden md:block top-0 sticky border-gray-200 border-r md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
//           <LeftSidebar courses={courses} />
//         </div>

//         {/* Main Content */}
//         <div className='pt-10 md:pt-0 w-full md:w-2/4 lg:w-3/5 min-h-screen'>
//           <Feed />
//         </div>

//         {/* Right Sidebar - Hidden on mobile */}
//         <div className='hidden md:block top-0 sticky border-gray-200 border-l md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
//           <RightSidebar />
//         </div>
//       </div>
//     </main>
//   );
// }
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, MessageSquare, GraduationCap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section (Inspired by Khan Academy) */}
      <section className='bg-[#fefcfb] px-6 py-20 text-center'>
        <h1 className='mx-auto max-w-4xl font-bold text-[#1f2937] text-4xl md:text-6xl'>
          For every Nigerian youth. Real growth. Real results.
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-gray-600 text-lg md:text-xl'>
          We’re building a platform that gives every young person the tools,
          mentors, and mindset to rise and win.
        </p>
        <div className='flex flex-wrap justify-center gap-4 mt-8'>
          <Button variant='default'>Join Now</Button>
          <Button variant='outline'>Explore Features</Button>
        </div>
      </section>

      {/* Statistics & Social Proof (Inspired by Skillshare) */}
      <section className='bg-[#f0f4f8] py-16 text-center'>
        <div className='gap-6 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl text-gray-800'>
          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col gap-4'>
              <div>
                <h2 className='font-bold text-amber-600 text-4xl'>50K+</h2>
                <p className='mt-2'>Active Nigerian Youths</p>
              </div>
            </CardContent>
          </Card>
          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col gap-4'>
              <div>
                <h2 className='font-bold text-amber-600 text-4xl'>1K+</h2>
                <p className='mt-2'>Mentors & Role Models</p>
              </div>
            </CardContent>
          </Card>
          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col gap-4'>
              <div>
                <h2 className='font-bold text-amber-600 text-4xl'>300+</h2>
                <p className='mt-2'>Growth Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col gap-4'>
              <div>
                <h2 className='font-bold text-amber-600 text-4xl'>4.9</h2>
                <p className='mt-2'>User Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feature Highlights (Improved for Visual Appeal) */}
      <section className='bg-white px-6 py-20'>
        <div className='gap-10 grid md:grid-cols-2 mx-auto max-w-5xl'>
          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col items-start gap-4 p-6'>
              <Lightbulb className='text-[#03A9F4]' size={32} />
              <h3 className='font-semibold text-2xl'>
                Discover the Code to Success
              </h3>
              <p className='text-gray-600'>
                Dive into success stories, personal development tools, and
                real-world lessons designed for the Nigerian experience.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col items-start gap-4 p-6'>
              <Users className='text-[#8BC34A]' size={32} />
              <h3 className='font-semibold text-2xl'>Real Mentorship</h3>
              <p className='text-gray-600'>
                Engage directly with industry leaders and role models across
                Nigeria.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col items-start gap-4 p-6'>
              <MessageSquare className='text-[#FFC107]' size={32} />
              <h3 className='font-semibold text-2xl'>Collaborate & Connect</h3>
              <p className='text-gray-600'>
                Chat, brainstorm, and build projects with peers who share your
                dreams.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-xl transition-shadow'>
            <CardContent className='flex flex-col items-start gap-4 p-6'>
              <GraduationCap className='text-[#03A9F4]' size={32} />
              <h3 className='font-semibold text-2xl'>
                Transformative Growth Courses
              </h3>
              <p className='text-gray-600'>
                Learn skills in entrepreneurship, mindset, branding, leadership,
                and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 px-6 py-10 text-white text-center'>
        <p className='text-sm'>&copy; 2025 CodeSuccex. All rights reserved.</p>
        <div className='space-x-4 mt-4'>
          <a href='#' className='hover:underline'>
            Privacy Policy
          </a>
          <a href='#' className='hover:underline'>
            Terms of Use
          </a>
          <a href='#' className='hover:underline'>
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
