"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Users,
  MessageSquare,
  GraduationCap,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-6 py-24 text-center'>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='z-10 relative'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge className='bg-gradient-to-r from-emerald-500 to-blue-500 mb-6 px-2 md:px-4 py-2 font-medium text-white text-xs md:text-sm'>
              🚀 Join 50,000+ Nigerian Youths Already Winning
            </Badge>
          </motion.div>

          <motion.h1
            className='bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 mx-auto max-w-5xl font-bold text-transparent text-3xl md:text-7xl leading-tight'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Unlock Your Potential.
            <br />
            <span className='text-emerald-600'>Rise & Win.</span>
          </motion.h1>

          <motion.p
            className='mx-auto mt-8 max-w-3xl text-gray-700 text-xl md:text-2xl leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The only platform built specifically for Nigerian youth. Get
            mentorship from industry leaders, access transformative courses, and
            join a community that&apos;s changing the game.
          </motion.p>

          <motion.div
            className='flex sm:flex-row flex-col justify-center gap-6 mt-12'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div {...scaleOnHover}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-xl px-8 py-4 font-semibold text-white text-lg'
              >
                Start Your Journey Free
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
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

      {/* Social Proof Stats */}
      <motion.section
        className='bg-gradient-to-r from-emerald-500 to-blue-500 py-16 text-white'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className='gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto px-6 max-w-6xl'
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {[
            { number: "50K+", label: "Active Members", icon: Users },
            { number: "1,200+", label: "Expert Mentors", icon: Award },
            { number: "500+", label: "Success Stories", icon: TrendingUp },
            { number: "4.9/5", label: "User Rating", icon: Star },
          ].map((stat, index) => (
            <motion.div key={index} className='text-center' variants={fadeInUp}>
              <stat.icon className='mx-auto mb-4 w-8 h-8' />
              <motion.h3
                className='font-bold text-4xl md:text-5xl'
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.h3>
              <p className='mt-2 text-emerald-100 text-lg'>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className='bg-white px-6 py-24'>
        <motion.div
          className='mx-auto max-w-6xl'
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='mb-16 text-center'>
            <Badge className='bg-emerald-100 mb-4 px-4 py-2 text-emerald-700'>
              Why Choose CodeSuccex?
            </Badge>
            <h2 className='mb-6 font-bold text-gray-900 text-4xl md:text-5xl'>
              Everything You Need to{" "}
              <span className='text-emerald-600'>Succeed</span>
            </h2>
            <p className='mx-auto max-w-3xl text-gray-600 text-xl'>
              We&apos;ve built the most comprehensive platform for Nigerian
              youth development. Here&apos;s what makes us different.
            </p>
          </div>

          <motion.div
            className='gap-8 grid md:grid-cols-2 lg:grid-cols-2'
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            {[
              {
                icon: Lightbulb,
                title: "Discover Your Success Blueprint",
                description:
                  "Access proven strategies and frameworks used by Nigeria's most successful entrepreneurs and leaders. No generic advice - just what works in our context.",
                color: "from-yellow-400 to-orange-500",
                bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
              },
              {
                icon: Users,
                title: "1-on-1 Mentorship That Works",
                description:
                  "Get paired with industry leaders who've walked your path. Real mentorship, real results, real connections that last a lifetime.",
                color: "from-emerald-400 to-green-500",
                bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
              },
              {
                icon: MessageSquare,
                title: "Build Your Network",
                description:
                  "Connect with ambitious peers, collaborate on projects, and build relationships that will accelerate your career for years to come.",
                color: "from-blue-400 to-purple-500",
                bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
              },
              {
                icon: GraduationCap,
                title: "Skills That Pay",
                description:
                  "Master in-demand skills through our practical courses. From entrepreneurship to digital marketing - learn what employers actually want.",
                color: "from-purple-400 to-pink-500",
                bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`h-full ${feature.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <CardContent className='p-8'>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <feature.icon className='w-8 h-8 text-white' />
                    </div>
                    <h3 className='mb-4 font-bold text-gray-900 text-2xl'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-700 text-lg leading-relaxed'>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className='bg-gradient-to-br from-gray-50 to-emerald-50 px-6 py-24'>
        <motion.div
          className='mx-auto max-w-6xl'
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='mb-16 text-center'>
            <Badge className='bg-emerald-100 mb-4 px-4 py-2 text-emerald-700'>
              Success Stories
            </Badge>
            <h2 className='mb-6 font-bold text-gray-900 text-4xl md:text-5xl'>
              Real People. Real Results.
            </h2>
          </div>

          <motion.div
            className='gap-8 grid md:grid-cols-3'
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            {[
              {
                name: "Adebayo Johnson",
                role: "Tech Entrepreneur",
                content:
                  "CodeSuccex connected me with a mentor who helped me launch my fintech startup. We're now serving 10,000+ users across Nigeria!",
                rating: 5,
              },
              {
                name: "Fatima Abdullahi",
                role: "Digital Marketer",
                content:
                  "The courses here are practical and relevant. I landed my dream job at a top agency just 3 months after completing the program.",
                rating: 5,
              },
              {
                name: "Chinedu Okafor",
                role: "Business Owner",
                content:
                  "The network I built here is invaluable. I've collaborated on multiple projects and my business has grown 300% this year.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className='bg-white shadow-xl border-0 h-full'>
                  <CardContent className='p-8'>
                    <div className='flex mb-4'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className='fill-current w-5 h-5 text-yellow-400'
                        />
                      ))}
                    </div>
                    <p className='mb-6 text-gray-700 text-lg leading-relaxed'>
                      &#34;{testimonial.content}&qout;
                    </p>
                    <div className='flex items-center'>
                      <div className='flex justify-center items-center bg-gradient-to-r from-emerald-400 to-blue-400 mr-4 rounded-full w-12 h-12 font-bold text-white text-lg'>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-900'>
                          {testimonial.name}
                        </h4>
                        <p className='text-gray-600'>{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
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
                <Button
                  size='lg'
                  className='bg-white hover:bg-gray-100 shadow-xl px-8 py-4 font-semibold text-emerald-600 text-lg'
                >
                  Get Started Free Today
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>
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

      {/* Footer */}
      <footer className='bg-gray-900 px-6 py-16 text-white'>
        <div className='mx-auto max-w-6xl'>
          <div className='gap-8 grid md:grid-cols-4 mb-8'>
            <div>
              <h3 className='mb-4 font-bold text-emerald-400 text-2xl'>
                CodeSuccex
              </h3>
              <p className='text-gray-400 leading-relaxed'>
                Empowering Nigerian youth to unlock their potential and achieve
                extraordinary success.
              </p>
            </div>
            <div>
              <h4 className='mb-4 font-semibold text-lg'>Platform</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Courses
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Mentorship
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Community
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='mb-4 font-semibold text-lg'>Support</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='mb-4 font-semibold text-lg'>Legal</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='pt-8 border-gray-800 border-t text-gray-400 text-center'>
            <p>
              &copy; 2025 CodeSuccex. All rights reserved. Built with ❤️ for
              Nigerian youth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
