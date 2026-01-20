"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, MessageSquare, GraduationCap } from "lucide-react";

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

export const FeaturesSection = () => {
  return (
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
            We&apos;ve built the most comprehensive platform for personal
            development. Here&apos;s what makes us different.
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
                "Master in-demand skills through our practical courses. From entrepreneurship to digital marketing - learn what actually works, what sets you apart, what leads to opportunities and growth.",
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
  );
};
